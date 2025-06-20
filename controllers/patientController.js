const {pool} = require("../config/db");
const { validatePhone, validateEmail } = require("../helpers/patientValidators");

exports.getPatient = async (req, res) => {
    const {id} = req.params;

    try{
        const patient = await pool.query("SELECT * FROM patients WHERE id = $1", [id]);

        if(patient.rows.length === 0){
            return res.status(404).json({error: "Patient not found"})
        }
        
        res.status(200).json(patient.rows[0])        
    }
    catch(err){
        console.error("Database error: ", err)
        res.status(500).json({error: "Internal server error"})
    }
}

exports.getAllPatients = async (req, res) => {
    try{
        const patients = await pool.query("SELECT * FROM patients");
        res.status(200).json(patients.rows)
    }
    catch(err){
        console.error("Database error: ", err)
        res.status(500).json({error: "Internal server error"})
    }
}

exports.createPatient = async (req, res) => {
    const {first_name, last_name, email, phone, age} = req.body
    
    if(!first_name || !last_name || !email || !phone || !age){
        return res.status(400).json({error: "Bad request: missing arguments"})
    }

    if(!validatePhone(phone)){
        return res.status(400).json({error: "Wrong phone number format"})
    }

    if(!validateEmail(email)){
        return res.status(400).json({error: "Wrong email format"})
    }

    try{
        await pool.query("INSERT INTO patients (first_name, last_name, email, phone, age) VALUES ($1, $2, $3, $4, $5)",
            [first_name, last_name, email, phone, age]
        )

        res.status(201).json({message: "Patient created successfully"})
    }
    catch(err){
        console.error("Database error: ", err)
        res.status(500).json({error: "Internal server error"})
    }
}

exports.updatePatient = async (req, res) => {
    const {id} = req.params
    
    const {first_name, last_name, email, phone, age} = req.body
    
    if(!first_name || !last_name || !email || !phone || !age){
        return res.status(400).json({error: "Bad request: missing arguments"})
    }

    if(!validatePhone(phone)){
        return res.status(400).json({error: "Wrong phone number format"})
    }

    if(!validateEmail(email)){
        return res.status(400).json({error: "Wrong email format"})
    }

    try{
        await pool.query("UPDATE patients SET first_name=$1, last_name=$2, email=$3, phone=$4, age=$5 WHERE id=$6",
            [first_name, last_name, email, phone, age, id]
        )

        res.status(201).json({message: "Patient updated successfully"})
    }
    catch(err){
        console.error("Database error: ", err)
        res.status(500).json({error: "Internal server error"})
    }
}

exports.deletePatient = async (req, res) => {
    const {id} = req.params

    try{
        const patient = await pool.query("SELECT * FROM patients WHERE id = $1", [id])
        
        if(patient.rows.length === 0){
            return res.status(404).json({error: "Patient not found"})
        }

        await pool.query("DELETE FROM patients WHERE id = $1", [id])

        res.status(200).json({message: "Patient deleted successfully"})
    }
    catch(err){
        console.error("Database error: ", err)
        res.json(500).json({error: "Internal server error"})
    }
}