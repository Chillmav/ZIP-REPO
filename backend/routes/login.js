import express from 'express';
import { MongoClient } from 'mongodb';

export const route = express.Router()
export let userData;
const uri = 'mongodb+srv://272408:xgJarlUbM9puLXWH@cluster0.qxfsslt.mongodb.net/';

const client = new MongoClient(uri);

let db, usersCollection;

async function run() {

    try {

        await client.connect();
        console.log('Connected to MongoDB');

        db = client.db("ZPI");
        usersCollection = db.collection('users');

        return { client, db, usersCollection};
        
    }

    catch (err) {

        console.log("Connection error:", err);
        if (client) await client.close();
        throw err;

    }
}

(async () => {
    try {
        await run();
    } catch (err) {
        console.error("Failed to initialize database:", err);
        throw err
    }
})();

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
