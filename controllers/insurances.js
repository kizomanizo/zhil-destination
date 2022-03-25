
// @Author Kizito Mrema
// @Usage ApiHelper function accepts res object, string type, string title and a message array
const insuranceService = require('../services/insurances')
const apiHelper = require('../helpers/api')

async function list(_req, res, next) {
    try { apiHelper.apiResponse(res, true, 200, 'Search', 'insurances found!', await insuranceService.list()) }
    catch (error) { next(error) }
}

async function create(req, res, next) {
    try { apiHelper.apiResponse(res, true, 201, 'Create', 'Insurance created!', await insuranceService.create(req)) }
    catch (error) { next(error) }
}

async function find(req, res, next) {
    try {apiHelper.apiResponse(res, true, 200, 'Find', 'Insurance found!', await insuranceService.find(req.params.id)) }
    catch (error) { next(error) }
}

async function update(req, res, next) {
    try { apiHelper.apiResponse(res, true, 200, 'Update', "Insurance updated!", await insuranceService.update(req, res, req.params.id)) }
    catch (error) { next(error) }
}

async function remove(req, res, next) {
    try { apiHelper.apiResponse(res, true, 202, 'Delete', "Insurance deleted!", await insuranceService.remove(req.params.id)) }
    catch (error) { next(error) }
}

module.exports = { list, create, find, update, remove, }