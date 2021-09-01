
// @Author Kizito Mrema
// @Usage ApiHelper function accepts res object, title string , remark string and a message array
const userService = require('../services/userService');
const apiHelper = require('../helpers/apiHelper');

async function list(_req, res, next) {
    try { apiHelper.apiResponse(res, 200, "Search", "All Users", await userService.list()) }
    catch (error) { next(error) }
}

async function create(req, res, next) {
    try { apiHelper.apiResponse(res, 201, "Create", "User created!", await userService.create(req)) }
    catch (error) { next(error) }
}

async function find(req, res, next) {
    try { apiHelper.apiResponse(res, 200, "Search", "User found!", await userService.find(req.params.id)) }
    catch (error) { next(error) }
}

async function update(req, res, next) {
    try { apiHelper.apiResponse(res, 200, "Update", "User updated!", await userService.update(req, req.params.id)) }
    catch (error) { next(error) }
}

async function remove(req, res, next) {
    try { apiHelper.apiResponse(res, 202, "Delete", "User deleted!", await userService.remove(req.params.id)) }
    catch (error) { next(error) }
}

async function login(req, res, next) {
    try { apiHelper.apiResponse(res, 200, "Login", "Login successful!", await userService.login(req))}
    catch (error) { next(error) }
}

module.exports = { list,create, find, update, remove, login, };