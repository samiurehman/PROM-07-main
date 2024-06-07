const express = require("express");
const {
  getIncidents,
  createIncident,
  getIncident,
  addLog,
  switchOfficer,
  closeIncident,
} = require("../controllers/incidentController");
const { protect } = require("../controllers/authController");

const router = express.Router();

// router.route("/").get(getIncidents).post(createIncident);

router.get("/", protect, getIncidents);
router.post("/", protect, createIncident);

router.get("/:id", protect, getIncident);

router.post("/log/:id", protect, addLog);

router.post("/switch/:id", protect, switchOfficer);

router.post("/close/:id", protect, closeIncident);

module.exports = router;
