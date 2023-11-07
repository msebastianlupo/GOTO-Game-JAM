import { createVoteSchema } from '../schemas/votes.js'

function validateCreateVote(req, res, next){
	createVoteSchema.validate(req.body, {
		stripUnknown: true
	})
	.then((data) =>{
		req.body = data
        next()
	})
	.catch(e => res.status(400).json(e))
}

export {
    validateCreateVote
}