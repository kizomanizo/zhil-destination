const Category = require('../models').Category
const { ErrorHandler } = require("../helpers/error")
const logsHelper = require('../helpers/logger')

async function list() {
    const allCategories = await Category.findAll({})
        if (!allCategories.length) { throw new ErrorHandler (404, 'Lolz; No categories found!.') }
    return allCategories
}

async function create(req, _res) {
    const newCategory = new Category(req.body);
        newCategory.name = req.body.name
        newCategory.description = req.body.description
        newCategory.status = true
        newCategory.created_by = req.decoded.id
        newCategory.updated_by = null
    return newCategory.save()
}

async function find(id) {
    const foundCategory = await Category.findOne({where:{id:id}})
        if(!foundCategory) { throw new ErrorHandler(404, 'Yikes, Category not found!') }
    return foundCategory
}

async function update(req, id) {
    const updatedCategory = await Category.findOne({where:{id:req.params.id}})
    if(!updatedCategory) { throw new ErrorHandler(404, 'Error: Category not found!') }
    else {
        if  (req.body.name != null ) { updatedCategory.name = req.body.name }
        if ( req.body.description != null ) { updatedCategory.description = req.body.description }
        updatedCategory.updated_by = req.decoded.id
        updatedCategory.updated_at = Date()
        await updatedCategory.save()
        logsHelper.infoLogger(updatedCategory.id, ' category has been updated')
        return updatedCategory
    }   
}

 async function remove(id) {
    const categoryToRemove = await Category.findOne({where:{id:id}})
    if (!categoryToRemove) { throw new ErrorHandler(404, 'Humpty dumpty, Category not Found!.') }
    else {
        logsHelper.infoLogger(categoryToRemove.id, ' category has been deleted.')
        return Category.destroy({where:{id:id}})
    }      
}
module.exports = { list, create, find, update, remove, }