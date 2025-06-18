const getPatient = (req, res) => {
    res.send("Get patient")
}

const createPatient = (req, res) => {
    console.log("Create patient")
}

const updatePatient = (req, res) => {
    console.log("Update patient")
}

const deletePatient = (req, res) => {
    console.log("Delete patient")
}

module.exports = {getPatient, createPatient, updatePatient, deletePatient}