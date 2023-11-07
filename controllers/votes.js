import { getJudgeVotes, createVote, getGameVotes } from '../services/votes.js'

function getJudgeVotesCtrl(req, res){
    const { judgeId } = req.params
    getJudgeVotes(judgeId)
    .then(votes => res.status(200).json(votes))
    .catch(e => res.status(500).json({error: 'se produjo un error interno'}))
}

function getGameVotesCtrl(req, res){
    const { gameId } = req.params
    getGameVotes(gameId)
    .then(votes => res.status(200).json(votes))
    .catch(e => res.status(500).json({error: 'se produjo un error interno'}))
}

function createVoteCtrl(req, res){
    const { judgeId } = req.params
    createVote(judgeId, req.body)
    .then(votes => res.status(201).json(votes))
    .catch((err) => {
        err == 400 ? res.status(400).json({error: 'la consulta es inválida o el voto ya fue creado anteriormente'}) : res.status(500).json({error: 'se produjo un error interno'}) 
    })
}

export {
    createVoteCtrl,
    getJudgeVotesCtrl,
    getGameVotesCtrl
}