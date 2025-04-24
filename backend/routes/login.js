import express from 'express';
import { MongoClient } from 'mongodb';
import { usersCollection } from '../db.js';
export const route = express.Router()
export let userData;


route.post('/', async (req, res) => {
    
    const { firstName, secondName } = req.body
    userData = { firstName, secondName };
    if (!firstName || !secondName) {

        return res.status(400).json({message: "Both first name and second name are required"})
    
    }
    
    try {

        await usersCollection.insertOne({
            firstName,
            secondName,
            createdAt: new Date()
        });

        res.json({
            message: "User Data added successfully",
            userData: userData
        });

    } catch (err) {
        console.log('Error:', err)
        res.status(500).json({message: "Failed to save user data"});
    }

})
