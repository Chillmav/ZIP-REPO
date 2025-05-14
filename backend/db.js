import {MongoClient} from 'mongodb';

const uri = 'mongodb+srv://272408:xgJarlUbM9puLXWH@cluster0.qxfsslt.mongodb.net/';

const client = new MongoClient(uri);

let db, usersCollection, framesCollection, colors;

export async function run() {

    try {

        await client.connect();
        console.log('Connected to MongoDB');

        db = client.db("ZPI");
        usersCollection = db.collection('users');
        framesCollection = db.collection('frames');
        colors = framesCollection.distinct("color");
        return { client, db, usersCollection};
        
    }

    catch (err) {

        console.log("Connection error:", err);
        if (client) await client.close();
        throw err;

    }
}

export {db, usersCollection, framesCollection, colors};