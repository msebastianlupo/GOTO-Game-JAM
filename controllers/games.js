import { getGames, findGame, createGame, modifyGame, deleteGame } from '../services/games.js'


function getGamesCtrl(req, res){
	getGames(req.query)
	.then(games => res.status(200).json(games))
	.catch(e => res.status(500).json({'error': 'se produjo un error interno'}))
}

function createGameCtrl(req, res){
	createGame(req.body)
	.then((game) => res.status(201).json(game))
	.catch(err => {
		if(err = 400){
			res.status(400).json({'error': 'el juego ya existe'})
		}else{
			res.status(500).json({'error': 'se produjo un error interno'})
		}
	})
}

function findGameCtrl(req, res){
    const { gameId } = req.params
    findGame(gameId)
	.then(game => res.status(200).json(game))
	.catch(e => res.status(404).json({'error': 'no se encontró el juego'}))
}

function modifyGameCtrl(req, res){
	const { gameId } = req.params
	modifyGame(gameId, req.body)
	.then(data => res.status(200).json(data))
	.catch(e => {
		if(e == 404){
			res.status(404).json({'error': 'el juego no existe'})
		}else{
			res.status(500).json({'error': 'no se pudo actualizar el juego'})
		}
	})
}

function deleteGameCtrl(req, res){
	const { gameId } = req.params
	deleteGame(gameId)
	.then(data => res.status(200).json(data))
	.catch(s => res.status(500).json({'error': 'no se pudo eliminar el juego'}))
}


export {
    getGamesCtrl,
    createGameCtrl,
    findGameCtrl,
	modifyGameCtrl,
	deleteGameCtrl
}