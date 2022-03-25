const Order = require('../models').Order
const { ErrorHandler } = require("../helpers/error")
const logsHelper = require('../helpers/logger')

async function list() {
    const allOrders = await Order.findAll({})
        if (!allOrders.length) { throw new ErrorHandler (404, 'Lolz; No orders found!.') }
    return allOrders
}

async function create(req, _res) {
    const newOrder = new Order(req.body);
        newOrder.order_date = req.body.order_date
        newOrder.client_id = req.body.client_id
        newOrder.is_insured = req.body.is_insured
        newOrder.insurance_number = req.body.insurance_number
        newOrder.insurance_id = req.body.insurance_id
        newOrder.status = true
        newOrder.created_by = req.decoded.id
        newOrder.updated_by = null
    return newOrder.save()
}

async function find(id) {
    const foundOrder = await Order.findOne({where:{id:id}})
        if(!foundOrder) { throw new ErrorHandler(404, 'Yikes, Order not found!') }
    return foundOrder
}

async function update(req, id) {
    const updatedOrder = await Order.findOne({where:{id:req.params.id}})
    if(!updatedOrder) { throw new ErrorHandler(404, 'Error: Order not found!') }
    else {
        if  (req.body.order_date != null ) { updatedOrder.order_date = req.body.order_date }
        if ( req.body.client_id != null ) { updatedOrder.client_id = req.body.client_id }
        if ( req.body.is_insured != null ) { updatedOrder.is_insured = req.body.is_insured }
        if ( req.body.insurance_number != null ) { updatedOrder.insurance_number = req.body.insurance_number }
        if ( req.body.insurance_id != null ) { updatedOrder.insurance_id = req.body.insurance_id }
        if ( req.body.status != null ) { updatedOrder.status = req.body.status }
        updatedOrder.updated_by = req.decoded.id
        updatedOrder.updated_at = Date()
        await updatedOrder.save()
        logsHelper.infoLogger(updatedOrder.id, ' order has been updated')
        return updatedOrder
    }   
}

 async function remove(id) {
    const orderToRemove = await Order.findOne({where:{id:id}})
    if (!orderToRemove) { throw new ErrorHandler(404, 'Humpty dumpty, Order not Found!.') }
    else {
        logsHelper.infoLogger(orderToRemove.id, ' order has been deleted.')
        return Order.destroy({where:{id:id}})
    }      
}
module.exports = { list, create, find, update, remove, }