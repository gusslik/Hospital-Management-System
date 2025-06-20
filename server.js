const express = require("express")
const cors = require("cors")

const patientRoute = require("./routes/patientRoute")
const doctorRoute = require("./routes/doctorRoute")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/patient", patientRoute)
app.use("/doctor", doctorRoute)

const PORT = 3000 || process.env.PORT

app.listen(PORT, console.log("Server is listening on port", PORT))