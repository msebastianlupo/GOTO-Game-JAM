import { MongoClient, ObjectId } from "mongodb"
import { checkGameExists, getGameName, modifyTotalScore } from "./games.js"
import { findJudge } from "./judges.js"

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("GJAM")
const votes = db.collection('Votes')

async function getAverageScores(gameId){
    await client.connect()
    return votes.aggregate([
        {
            $match: {game_id: gameId}
        },
        {
            $group: {
                _id: "$game_id",
                playability_average: {$avg: "$playability"},
                art_average: {$avg: "$art"},
                sound_average: {$avg: "$sound"},
                afinity_average: {$avg: "$afinity"}
            }
        },
        {
            $set: {
                playability_average: {$round: ["$playability_average", 1]},
                art_average: {$round: ["$art_average", 1]},
                sound_average: {$round: ["$sound_average", 1]},
                afinity_average: {$round: ["$afinity_average", 1]}
            }
        }
    ]).toArray()
}

async function getJudgeVotes(judgeId){
    await client.connect()
    return votes.find({
        judge_id: judgeId
    },
    {
        projection: {judge_id: 0, judge_name: 0}
    }).toArray()
}

async function getGameVotes(gameId){
    await client.connect()
    return votes.find({
        game_id: gameId
    },
    {
        projection: {game_id: 0, game_name: 0}
    }).toArray()
}

async function checkVoteExists(filter = {}){
    await client.connect()
    const vote = await votes.findOne(filter)
    return vote ? true : false
}

function validateObjectId(id){
    return ObjectId.isValid(id)
}

async function createVote(judgeId, vote){
    await client.connect()
    if(validateObjectId(vote.game_id)){
        const gameExists = await checkGameExists({_id: new ObjectId(vote.game_id)})
        const voteExists = await checkVoteExists({judge_id: judgeId, game_id: vote.game_id})
        if(gameExists && !voteExists){
            const voteCopy = {...vote}
            voteCopy.judge_id = judgeId
            const judgeName = await findJudge(judgeId)
            const gameName = await getGameName(vote.game_id)
            voteCopy.judge_name = judgeName.name
            voteCopy.game_name = gameName.name
            await votes.insertOne(voteCopy)
            let score = vote.playability + vote.art + vote.sound + vote.afinity
            await modifyTotalScore(vote.game_id, score)
            return voteCopy
        }
    }
    throw(400)
}

export {
    getAverageScores,
    getJudgeVotes,
    getGameVotes,
    createVote
}