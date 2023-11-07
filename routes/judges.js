import express from 'express'
import { getJudgesCtrl, findJudgeCtrl } from '../controllers/judges.js'

const judgesRoutes = express.Router()

judgesRoutes.route('/judges')
.get(getJudgesCtrl)

judgesRoutes.route('/judges/:judgeId')
.get(findJudgeCtrl)

export {
    judgesRoutes
}