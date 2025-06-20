const express = require("express")
const route = express.Router()
const doctorController = require("../controllers/doctorController")

// Retrieve patient data
route.get("/:id", doctorController.getDoctor)

// Retrieve all patients data
route.get("/", doctorController.getAllDoctors)

// Create new patient
route.post("/", doctorController.createDoctor)

// Update existing patient's data
route.put("/:id", doctorController.updateDoctor)

// Delete existing patient
route.delete("/:id", doctorController.deleteDoctor)

module.exports = route