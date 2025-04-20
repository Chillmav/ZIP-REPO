import express from 'express'

export const route = express.Router()
const userData = [];

route.post('/', (req, res) => {
    const { firstName, secondName } = req.body

    if (!firstName || !secondName) {
        return res.status(400).json({message: "Both first name and second name are required"})
    }
    
    userData.push({ firstName, secondName })

    res.json({
        message: "User Data added successfully",
        userData: userData
    });

})