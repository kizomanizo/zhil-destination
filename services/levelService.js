const Level = require('../models').levelModel
const { ErrorHandler } = require("../helpers/errorHelper")

async function list() {
    const allLevels = await Level.findAll({})
        if (!allLevels.length) { throw new ErrorHandler (404, 'Lolz; No levels found!.') }
    return allLevels
};

async function create(req, _res) {
    const newLevel = new Level(req.body);
        newLevel.name = req.body.name
        newLevel.description = req.body.description
        newLevel.access = req.body.access
        newLevel.status = true
        newLevel.createdBy = req.decoded.id
        newLevel.updatedBy = null
    return newLevel.save()
};

async function find(id) {
    const foundLevel = await Level.findOne({where:{id:id}})
        if(!foundLevel) { throw new ErrorHandler(404, 'Yikes, Level not found!') }
    return foundLevel
}

async function update(req, id) {
    const updatedLevel = await Level.findOne({where:{id:req.params.id}})
    if(!updatedLevel) { throw new ErrorHandler(404, 'Error: Level not found!') }
    else {
        if  (req.body.name != null ) { updatedLevel.name = req.body.name }
        if ( req.body.description != null ) { updatedLevel.description = req.body.description }
        if ( req.body.access != null ) { updatedLevel.access = req.body.access }
        if ( req.body.rights != null ) { updatedLevel.rights = req.body.rights }
        if ( req.body.status != null ) { updatedLevel.status = req.body.status }
        updatedLevel.updatedBy = req.decoded.id
        updatedLevel.updatedAt = Date()
        await updatedLevel.save()
        return updatedLevel
    }   
}

 async function remove(id) {
    const levelToRemove = await Level.findOne({where:{id:id}})
    if (!levelToRemove) { throw new ErrorHandler(404, 'Humpty dumpty, Level not Found!.') }
    else {
        return Level.destroy({where:{id:id}})
    }      
}
module.exports = { list, create, find, update, remove, }