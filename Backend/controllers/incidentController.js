const models = require("../models");
const catchAsync = require("../utils/catchAsync");
const Validator = require("fastest-validator");
const AppError = require("../utils/appError");

exports.getIncidents = catchAsync(async (req, res) => {
  const posts = await models.Incident.findAll();
  res.status(200).json({
    status: "success",
    data: posts,
  });
});

exports.createIncident = catchAsync(async (req, res, next) => {
  var incident = {
    natureOfIncident: req.body.natureOfIncident,
    locationOfIncident: req.body.locationOfIncident,
    weatherCondition: req.body.weatherCondition,
    switchingOfficer: req.user.email,
    closed: false,
    userId: req.user.id,
    date: req.body.date || new Date(),
  };

  const schema = {
    natureOfIncident: { type: "string", optional: false, max: "700" },
    locationOfIncident: { type: "string", optional: false, max: "200" },
    weatherCondition: { type: "string", optional: false, max: "50" },
  };

  const v = new Validator();
  const validationResponse = v.validate(incident, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validationResponse,
    });
  }

  let newIncident = await models.Incident.create(incident);
  res.status(201).json({
    status: "success",
    data: newIncident,
  });
});

exports.getIncident = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const id = req.params.id;
  const incident = await models.Incident.findByPk(id, {
    include: { model: models.Log },
  });
  if (!incident)
    return next(new AppError("No incident found with that ID", 404));

  return res.status(200).json({
    status: "success",
    data: incident,
  });
});

exports.addLog = catchAsync(async (req, res, next) => {
  const incidentId = req.params.id;
  const incident = await models.Incident.findByPk(incidentId);
  if (!incident)
    return next(new AppError("No incident found with that ID", 404));
  let log = {
    nameOfPersonVisiting: req.body.nameOfPersonVisiting,
    reasonForAttendance: req.body.reasonForAttendance,
    protectiveClothingWorn: req.body.protectiveClothingWorn,
    weatherCondition: req.body.weatherCondition,
    officerCompletingLog: req.body.officerCompletingLog,
    incidentId: parseInt(incidentId),
    date: req.body.date || new Date(),
  };

  const schema = {
    nameOfPersonVisiting: { type: "string", optional: false, max: "200" },
    reasonForAttendance: { type: "string", optional: false, max: "500" },
    protectiveClothingWorn: { type: "string", optional: false, max: "500" },
    officerCompletingLog: { type: "string", optional: false, max: "200" },
    weatherCondition: { type: "string", optional: false, max: "50" },
  };

  const v = new Validator();
  const validationResponse = v.validate(log, schema);
  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validationResponse,
    });
  }

  let data = await models.Log.create(log);
  res.status(201).json({
    status: "success",
    data,
  });
});

exports.switchOfficer = catchAsync(async (req, res, next) => {
  const officerEmail = req.body.officerEmail;
  const incidentId = req.params.id;

  const officerExists = await models.User.findOne({
    where: { email: officerEmail },
  });
  if (!officerExists) {
    return next(new AppError("No officer found with that email", 404));
  }
  const incident = await models.Incident.findByPk(incidentId);
  if (!incident)
    return next(new AppError("No incident found with that ID", 404));

  await models.Incident.update(
    { switchingOfficer: officerEmail },
    { where: { id: incidentId } }
  );
  // await incident.save();
  res.status(200).json({
    status: "success",
    data: incident,
  });
});

exports.closeIncident = catchAsync(async (req, res, next) => {
  const incidentId = req.params.id;
  const incident = await models.Incident.findByPk(incidentId);

  if (!incident)
    return next(new AppError("No incident found with that ID", 404));

  await models.Incident.update({ closed: true }, { where: { id: incidentId } });

  res.status(200).json({
    status: "success",
    data: incident,
  });
});
