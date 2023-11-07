import express from 'express'
import {getEditionsCtrl, getEditionGamesCtrl, redirectCtrl} from '../controllers/editions.js'

const editionsRoutes = express.Router()

editionsRoutes.route('/editions')
.get(getEditionsCtrl)

editionsRoutes.route('/editions/:editionId')
.get(redirectCtrl)

editionsRoutes.route('/editions/:editionId/games')
.get(getEditionGamesCtrl)

export {
    editionsRoutes
}