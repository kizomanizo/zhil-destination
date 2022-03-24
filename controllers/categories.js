
// @Author Kizito Mrema
// @Usage ApiHelper function accepts res object, string type, string title and a message array
const categoryService = require('../services/categories')
const apiHelper = require('../helpers/api')

async function list(_req, res, next) {
    try { apiHelper.apiResponse(res, true, 200, 'Search', 'Categories found!', await categoryService.list()) }
    catch (error) { next(error) }
}

async function create(req, res, next) {
    try { apiHelper.apiResponse(res, true, 201, 'Create', 'Category created!', await categoryService.create(req)) }
    catch (error) { next(error) }
}

async function find(req, res, next) {
    try {apiHelper.apiResponse(res, true, 200, 'Find', 'Category found!', await categoryService.find(req.params.id)) }
    catch (error) { next(error) }
}

async function update(req, res, next) {
    try { apiHelper.apiResponse(res, true, 200, 'Update', "Category updated!", await categoryService.update(req, res, req.params.id)) }
    catch (error) { next(error) }
}

async function remove(req, res, next) {
    try { apiHelper.apiResponse(res, true, 202, 'Delete', "Category deleted!", await categoryService.remove(req.params.id)) }
    catch (error) { next(error) }
}

module.exports = { list, create, find, update, remove, }