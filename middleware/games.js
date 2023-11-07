import { createGameSchema, modifyGameSchema } from "../schemas/games.js";

function validatecreateGame(req, res, next){
	createGameSchema.validate(req.body, {
		stripUnknown: true
	})
	.then((data) =>{
		req.body = data
        next()
	})
	.catch(e => res.status(400).json(e))
}

function validateModifyGame(req, res, next){
	modifyGameSchema.validate(req.body, {
		stripUnknown: true
	})
	.then((data) =>{
		req.body = data
        next()
	})
	.catch(e => res.status(400).json(e))
}

export {
    validatecreateGame,
	validateModifyGame
}