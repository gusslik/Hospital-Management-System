const express = require("express")
const route = express.Router()
const patientController = require("../controllers/patientController")

// Retrieve patient data
route.get("/:id", patientController.getPatient)

// Create new patient
route.post("/", patientController.createPatient)

// Update existing patient's data
route.put("/:id", patientController.updatePatient)

// Delete existing patient
route.delete("/:id", patientController.deletePatient)

module.exports = route