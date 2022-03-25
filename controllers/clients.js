
// @Author Kizito Mrema
// @Usage ApiHelper function accepts res object, title string , remark string and a message array
const clientService = require('../services/clients');
const apiHelper = require('../helpers/api');

async function list(_req, res, next) {
    try { apiHelper.apiResponse(res, true, 200, "Search", "All Clients", await clientService.list()) }
    catch (error) { next(error) }
}

async function create(req, res, next) {
    try { apiHelper.apiResponse(res, true, 201, "Create", "Client created!", await clientService.create(req)) }
    catch (error) { next(error) }
}

async function find(req, res, next) {
    try { apiHelper.apiResponse(res, true, 200, "Search", "Client found!", await clientService.find(req.params.id)) }
    catch (error) { next(error) }
}

async function update(req, res, next) {
    try { apiHelper.apiResponse(res, true, 200, "Update", "Client updated!", await clientService.update(req, req.params.id)) }
    catch (error) { next(error) }
}

async function remove(req, res, next) {
    try { apiHelper.apiResponse(res, true, 202, "Delete", "Client deleted!", await clientService.remove(req.params.id)) }
    catch (error) { next(error) }
}

module.exports = { list, create, find, update, remove };