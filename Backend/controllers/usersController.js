const models = require("../models");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.GetUser = catchAsync(async (req, res, next) => {
  const user = await models.User.findByPk(req.user.id, {
    include: { model: models.Role, as: "Role" },
  });

  if (!user) return next(new AppError("User not found", 404));

  const data = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.Role.name,
  };

  res.status(200).json({ status: "success", data });
});

exports.GetAllUsers = catchAsync(async (req, res, next) => {
  const users = await models.User.findAll({
    attributes: ["id", "firstName", "lastName", "email", "active"],
    include: { model: models.Role, as: "Role" },
  });

  res.status(200).json({ status: "success", data: users });
});
