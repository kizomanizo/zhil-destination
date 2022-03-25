const Insurance = require('../models').Insurance
const { ErrorHandler } = require("../helpers/error")
const logsHelper = require('../helpers/logger')

async function list() {
    const allInsurances = await Insurance.findAll({})
        if (!allInsurances.length) { throw new ErrorHandler (404, 'Lolz; No insurances found!.') }
    return allInsurances
}

async function create(req, _res) {
    const newInsurance = new Insurance(req.body);
        newInsurance.name = req.body.name
        newInsurance.description = req.body.description
        newInsurance.status = true
        newInsurance.created_by = req.decoded.id
        newInsurance.updated_by = null
    return newInsurance.save()
}

async function find(id) {
    const foundInsurance = await Insurance.findOne({where:{id:id}})
        if(!foundInsurance) { throw new ErrorHandler(404, 'Yikes, Insurance not found!') }
    return foundInsurance
}

async function update(req, id) {
    const updatedInsurance = await Insurance.findOne({where:{id:req.params.id}})
    if(!updatedInsurance) { throw new ErrorHandler(404, 'Error: Insurance not found!') }
    else {
        if  (req.body.name != null ) { updatedInsurance.name = req.body.name }
        if ( req.body.description != null ) { updatedInsurance.description = req.body.description }
        updatedInsurance.updated_by = req.decoded.id
        updatedInsurance.updated_at = Date()
        await updatedInsurance.save()
        logsHelper.infoLogger(updatedInsurance.id, ' insurance has been updated')
        return updatedInsurance
    }   
}

 async function remove(id) {
    const insuranceToRemove = await Insurance.findOne({where:{id:id}})
    if (!insuranceToRemove) { throw new ErrorHandler(404, 'Humpty dumpty, Insurance not Found!.') }
    else {
        logsHelper.infoLogger(insuranceToRemove.id, ' insurance has been deleted.')
        return Insurance.destroy({where:{id:id}})
    }      
}
module.exports = { list, create, find, update, remove, }