const {pool} = require("../config/db");

exports.getDoctor = async (req, res) => {
    const {id} = req.params;

    try{
        const doctor = await pool.query("SELECT * FROM doctors WHERE id = $1", [id]);

        if(doctor.rows.length === 0){
            return res.status(404).json({error: "Doctor not found"})
        }
        
        res.status(200).json(doctor.rows[0])        
    }
    catch(err){
        console.error("Database error: ", err)
        res.status(500).json({error: "Internal server error"})
    }
}

exports.getAllDoctors = async (req, res) => {
    try{
        const doctors = await pool.query("SELECT * FROM doctors");
        res.status(200).json(doctors.rows)
    }
    catch(err){
        console.error("Database error: ", err)
        res.status(500).json({error: "Internal server error"})
    }
}

exports.createDoctor = async (req, res) => {
    const {first_name, last_name} = req.body
    
    if(!first_name || !last_name){
        return res.status(400).json({error: "Bad request: missing arguments"})
    }

    try{
        await pool.query("INSERT INTO doctors (first_name, last_name) VALUES ($1, $2)",
            [first_name, last_name]
        )

        res.status(201).json({message: "Doctor created successfully"})
    }
    catch(err){
        console.error("Database error: ", err)
        res.status(500).json({error: "Internal server error"})
    }
}

exports.updateDoctor = async (req, res) => {
    const {id} = req.params

    const {first_name, last_name} = req.body

    if(!first_name || !last_name){
        return res.status(400).json({error: "Bad request: missing arguments"})
    }

    const patient = await pool.query("SELECT * FROM doctors WHERE id = $1", [id])

    if(patient.rows.length === 0){
        return res.status(404).json({error: "Doctor not found"})
    }

    try{
        await pool.query("UPDATE doctors SET first_name=$1, last_name=$2 WHERE id=$3",
            [first_name, last_name, id]
        )

        res.status(201).json({message: "Doctor updated successfully"})
    }
    catch(err){
        console.error("Database error: ", err)
        res.status(500).json({error: "Internal server error"})
    }
}

exports.deleteDoctor = async (req, res) => {
    const {id} = req.params

    try{
        const patient = await pool.query("SELECT * FROM doctors WHERE id = $1", [id])
        
        if(patient.rows.length === 0){
            return res.status(404).json({error: "Doctor not found"})
        }

        await pool.query("DELETE FROM doctors WHERE id = $1", [id])

        res.status(200).json({message: "Doctor deleted successfully"})
    }
    catch(err){
        console.error("Database error: ", err)
        res.json(500).json({error: "Internal server error"})
    }
}