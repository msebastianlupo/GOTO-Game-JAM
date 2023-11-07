import express from 'express'
import { createGameCtrl, findGameCtrl, getGamesCtrl, modifyGameCtrl, deleteGameCtrl } from '../controllers/games.js'
import { validatecreateGame, validateModifyGame } from '../middleware/games.js' 

const gamesRoutes = express.Router()

gamesRoutes.route('/games')
.get(getGamesCtrl)
.post([validatecreateGame], createGameCtrl)

gamesRoutes.route('/games/:gameId')
.get(findGameCtrl)
.patch([validateModifyGame], modifyGameCtrl)
.delete(deleteGameCtrl)

export {
    gamesRoutes
}