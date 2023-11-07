import { MongoClient } from "mongodb"

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("GJAM")
const games = db.collection('Games')


async function getEditions(){
    await client.connect()
    return games.distinct("edition")
}

export {
    getEditions
}