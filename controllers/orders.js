
// @Author Kizito Mrema
// @Usage ApiHelper function accepts res object, string type, string title and a message array
const orderService = require('../services/orders')
const apiHelper = require('../helpers/api')

async function list(_req, res, next) {
    try { apiHelper.apiResponse(res, true, 200, 'Search', 'Orders found!', await orderService.list()) }
    catch (error) { next(error) }
}

async function create(req, res, next) {
    try { apiHelper.apiResponse(res, true, 201, 'Create', 'Order created!', await orderService.create(req)) }
    catch (error) { next(error) }
}

async function find(req, res, next) {
    try {apiHelper.apiResponse(res, true, 200, 'Find', 'Order found!', await orderService.find(req.params.id)) }
    catch (error) { next(error) }
}

async function update(req, res, next) {
    try { apiHelper.apiResponse(res, true, 200, 'Update', "Order updated!", await orderService.update(req, res, req.params.id)) }
    catch (error) { next(error) }
}

async function remove(req, res, next) {
    try { apiHelper.apiResponse(res, true, 202, 'Delete', "Order deleted!", await orderService.remove(req.params.id)) }
    catch (error) { next(error) }
}

module.exports = { list, create, find, update, remove, }