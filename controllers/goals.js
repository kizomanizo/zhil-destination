
// @Author Kizito Mrema
// @Usage ApiHelper function accepts res object, string type, string title and a message array
const goalService = require('../services/goals')
const apiHelper = require('../helpers/api')

async function list(_req, res, next) {
    try { apiHelper.apiResponse(res, 200, 'Search', 'Goals found!', await goalService.list()) }
    catch (error) { next(error) }
}

async function create(req, res, next) {
    try { apiHelper.apiResponse(res, 201, 'Create', 'Goal created!', await goalService.create(req)) }
    catch (error) { next(error) }
}

async function find(req, res, next) {
    try {apiHelper.apiResponse(res, 200, 'Find', 'Goal found!', await goalService.find(req.params.id)) }
    catch (error) { next(error) }
}

async function update(req, res, next) {
    try { apiHelper.apiResponse(res, 200, 'Update', "Goal updated!", await goalService.update(req, res, req.params.id)) }
    catch (error) { next(error) }
}

async function remove(req, res, next) {
    try { apiHelper.apiResponse(res, 202, 'Delete', "Goal deleted!", await goalService.remove(req.params.id)) }
    catch (error) { next(error) }
}

module.exports = { list, create, find, update, remove, }