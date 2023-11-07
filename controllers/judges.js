import {getJudges, findJudge} from '../services/judges.js'


function getJudgesCtrl(req, res){
    getJudges()
    .then(judges => res.status(200).json(judges))
    .catch(e => res.status(500).json({'error': 'se produjo un error interno'}))
}

function findJudgeCtrl(req, res){
    const { judgeId } = req.params
    findJudge(judgeId)
    .then(judge => res.status(200).json(judge))
    .catch(e => res.status(404).json({'error': 'no se encontró el juez'}))
}

export {
    getJudgesCtrl,
    findJudgeCtrl
}