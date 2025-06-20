const express = require("express")
const cors = require("cors")

const patientRoute = require("./routes/patientRoute")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/patient", patientRoute)

const PORT = 3000 || process.env.PORT

app.listen(PORT, console.log("Server is listening on port", PORT))