const catchAsync = require("../utils/catchAsync");
const models = require("../models");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const AppError = require("../utils/appError");
const { promisify } = require("util");
const Validator = require("fastest-validator");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  //Remove the user from the output
  user.password = undefined;
  let data = {
    id: user.id,
    username: user.username,
    email: user.email,
    token,
  };

  res.status(statusCode).json({
    status: "success",
    data,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const registrationSchema = {
    firstName: { type: "string", optional: false, max: "100" },
    lastName: { type: "string", optional: false, max: "100" },
    email: { type: "email", optional: false },
    password: { type: "string", optional: false },
    confirmPassword: { type: "string", optional: false },
    roleId: { type: "number", optional: false },
  };

  const v = new Validator();
  const validationResponse = v.validate(req.body, registrationSchema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validationResponse,
    });
  }

  let existingUser = await models.User.findOne({
    where: { email: req.body.email },
  });

  if (existingUser) {
    return next(new AppError("User already exists", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new AppError("Passwords do not match", 400));
  }

  bcryptjs.genSalt(10, function (err, salt) {
    bcryptjs.hash(req.body.password, salt, function (err, hash) {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        roleId: req.body.roleId,
        active: true,
        password: hash,
      };

      models.User.create(user)
        .then((result) => {
          createSendToken(result, 201, req, res);
        })
        .catch((error) => {
          res.status(500).json({
            message: "Something went wrong!",
          });
        });
    });
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError("Please provide email and password", 400));

  const user = await models.User.findOne({ where: { email } });
  if (!user) return next(new AppError("Incorrect email or password", 401));

  const isCorrectPassword = await bcryptjs.compare(password, user.password);
  if (!isCorrectPassword)
    return next(new AppError("Incorrect email or password", 401));

  createSendToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return next(new AppError("Unauthorized", 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await models.User.findByPk(decoded.id, {
    include: { model: models.Role, as: "Role" },
  });

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists", 401)
    );
  }

  req.user = currentUser;
  next();
});

exports.onlyAdmin = (req, res, next) => {
  if (req.user.Role.name !== "Admin") {
    return next(
      new AppError("You do not have permission to perform this action", 403)
    );
  }
  next();
};
