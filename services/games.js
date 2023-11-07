import { MongoClient, ObjectId } from "mongodb"
import { getAverageScores } from "./votes.js"

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("GJAM")
const games = db.collection('Games')

function fixQuery(query){
    const filter = {}
    for(let q in query)
    if(isNaN(query[q])){
        filter[q] = query[q]
    }else{
        filter[q] = parseInt(query[q])
    }
    return filter
}

async function getGames(query = {}){
    await client.connect()
    const queryMongo = fixQuery(query)
    queryMongo.deleted = {$exists: false}
    return games.find(queryMongo,{
        projection: {total_score: 0}
    })
    .toArray()
}

async function getEditionGames(edition, query = {}){
    await client.connect()
    query.edition = edition
    const queryMongo = fixQuery(query)
    queryMongo.deleted = {$exists: false}
    return games.find(queryMongo,{
        projection: {name: 1, total_score: 1, genre: 1}
    })
    .sort({total_score: -1})
    .toArray()
}

function validateObjectId(id){
    return ObjectId.isValid(id)
}

async function findGame(id){
    await client.connect()
    if(validateObjectId(id)){
        const game = await games.findOne({
            _id: new ObjectId(id),
            deleted: {$exists: false}
        },
        {
            projection: {total_score: 0}
        })
        if(game){
            const averages = await getAverageScores(id)
            const gameAndAverages = {...game, ...averages[0]}
            return gameAndAverages
        }
    }
    throw(404)
}

async function getGameName(id){
    if(validateObjectId(id)){
        return games.findOne({
            _id: new ObjectId(id)
        },
        {
            projection: {name: 1}
        })
    }
    throw(404)
}

async function checkGameExists(filter = {}){
    await client.connect()
    const game = await games.findOne(filter)
    return game ? true : false
}

async function createGame(game){
    if(!await checkGameExists({name: game.name})){
        await client.connect()
        const gameCopy = {...game, total_score: 0}
        await games.insertOne(gameCopy)
        return gameCopy
    }
    throw(400)
}

async function modifyGame(gameId, data){
    await client.connect()
    const dataCopy = {...data}
    if(validateObjectId(gameId)){
        const update = await games.updateOne(
            {_id: new ObjectId(gameId)},
            {$set: dataCopy}
        )
        if(update.modifiedCount){
            return dataCopy
        }else{
            throw(500)
        }
    }
    throw(404)
}

async function modifyTotalScore(gameId, score){
    await client.connect()
    if(validateObjectId(gameId)){
        return games.updateOne({_id: new ObjectId(gameId)}, {$inc: {total_score: score}})
    }
    return null
}

async function deleteGame(gameId){
    await client.connect()
    if(validateObjectId(gameId)){
        const deleted = await games.findOneAndUpdate(
            {_id: new ObjectId(gameId)},
            {$set: {deleted: true}},
            {returnDocument: "after"}
        )
        if(deleted){
            return deleted.value
        }
        throw(500)
    }
    throw(404)
}

export {
    getGames,
    getGameName,
    getEditionGames,
    findGame,
    createGame,
    modifyGame,
    modifyTotalScore,
    deleteGame,
    checkGameExists
}