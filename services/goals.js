const Goal = require('../models').Goal
const { ErrorHandler } = require("../helpers/error")
const logsHelper = require('../helpers/logger')

async function list() {
    const allGoals = await Goal.findAll({})
        if (!allGoals.length) { throw new ErrorHandler (404, 'Lolz; No goals found!.') }
    return allGoals
}

async function create(req, _res) {
    const newGoal = new Goal(req.body);
        newGoal.name = req.body.name
        newGoal.details = req.body.details
        newGoal.status = true
        newGoal.created_by = req.decoded.id
        newGoal.updated_by = null
    return newGoal.save()
}

async function find(id) {
    const foundGoal = await Goal.findOne({where:{id:id}})
        if(!foundGoal) { throw new ErrorHandler(404, 'Yikes, Goal not found!') }
    return foundGoal
}

async function update(req, id) {
    const updatedGoal = await Goal.findOne({where:{id:req.params.id}})
    if(!updatedGoal) { throw new ErrorHandler(404, 'Error: Goal not found!') }
    else {
        if  (req.body.name != null ) { updatedGoal.name = req.body.name }
        if ( req.body.details != null ) { updatedGoal.details = req.body.details }
        updatedGoal.updated_by = req.decoded.id
        updatedGoal.updated_at = Date()
        await updatedGoal.save()
        logsHelper.infoLogger(updatedGoal.id, 'has been updated')
        return updatedGoal
    }   
}

 async function remove(id) {
    const goalToRemove = await Goal.findOne({where:{id:id}})
    if (!goalToRemove) { throw new ErrorHandler(404, 'Humpty dumpty, Goal not Found!.') }
    else {
        logsHelper.infoLogger(goalToRemove.id, 'has been deleted.')
        return Goal.destroy({where:{id:id}})
    }      
}
module.exports = { list, create, find, update, remove, }