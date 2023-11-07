import express from 'express'
import { createVoteCtrl, getJudgeVotesCtrl, getGameVotesCtrl } from '../controllers/votes.js'
import { validateCreateVote } from '../middleware/votes.js'

const votesRoutes = express.Router()

votesRoutes.route('/judges/:judgeId/votes')
.get(getJudgeVotesCtrl)
.post([validateCreateVote], createVoteCtrl)

votesRoutes.route('/games/:gameId/votes')
.get(getGameVotesCtrl)

export {
    votesRoutes
}