import { getEditions } from '../services/editions.js'
import { getEditionGames } from '../services/games.js'


function getEditionsCtrl(req, res){
    getEditions()
    .then(editions => res.json(editions))
}

function redirectCtrl(req, res){
    const { editionId } = req.params
    res.redirect(`/editions/${editionId}/games`)
}

function getEditionGamesCtrl(req, res){
    const { editionId } = req.params
    getEditionGames(editionId, req.query)
    .then(games => res.json(games))
}

export {
    getEditionsCtrl,
    redirectCtrl,
    getEditionGamesCtrl
}