import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("GJAM")
const judges = db.collection('Judges')

async function getJudges(){
    await client.connect()
    return judges.find({}).toArray()
}

function validateObjectId(id){
    return ObjectId.isValid(id)
}

async function findJudge(id){
    await client.connect()
    if(validateObjectId(id)){
        const judge = await judges.findOne({
            _id: new ObjectId(id)
        })
        if(judge){
            return judge
        }
    }
    throw(404)
}

export {
    getJudges,
    findJudge,
}