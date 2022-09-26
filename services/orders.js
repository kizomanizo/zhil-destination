const Order = require('../models').Order
const { ErrorHandler } = require("../helpers/error")
const logsHelper = require('../helpers/logger')
const Item = require('../models').Item
const OrderItem = require('../models').OrderItem

async function list() {
    const allOrders = await Order.findAll({})
        if (!allOrders.length) { throw new ErrorHandler (404, 'Lolz; No orders found!.') }
    return allOrders
}

async function create(req) {
    const newOrder = new Order(req)
        newOrder.order_date = req.body.order_date
        newOrder.status = true
        newOrder.created_by = req.decoded.id
        newOrder.updated_by = null
        await newOrder.save()
        for (let index = 0; index < req.body.items.length; index++) {
            const newOrderItem = new OrderItem()
            const item = await Item.findOne({ where: { id: req.body.items[index].item_id }})
                newOrderItem.order_id = newOrder.id
                newOrderItem.item_id = req.body.items[index].item_id
                if (req.body.items[index].quantity) {
                    newOrderItem.quantity = req.body.items[index].quantity
                    newOrderItem.payment = req.body.items[index].quantity * item.selling_price
                } else {
                    newOrderItem.quantity = 0
                    newOrderItem.payment = 0
                }
                newOrderItem.created_by = req.decoded.id
            newOrderItem.save()               
        }
        const completeOrder = await Order.findOne({
            where: { id: newOrder.id },
            include: {
                model: Item,
                as: 'items',
                through: {
                    attributes: ['id', 'quantity', 'payment']
                }
            }
        })
        req.params.id = newOrder.id
    return this.find(req)
}

/**
 * Find a specific order usine its ID, "Everyone should read each Library's DOCS"
 * @param  {Object} foundOrder                  Specific order that we query
 * @param  {ObjectConstructor} ErrorHandler     Custom error handling utility
 * @return {Object}                             The full object as retrieved from the DB
 */
async function find(req) {
    const foundOrder = await Order.findOne({
        where: { id: req.params.id },
        include: {
            model: Item,
            as: 'items',
            through: {
                attributes: ['id', 'quantity', 'payment']
            }
        }
    })
    if(!foundOrder) { throw new ErrorHandler(404, 'Yikes, Order not found!') }
    return foundOrder
}

async function update(req) {
    const updatedOrder = await Order.findOne({ where:{ id:req.params.id } })
    if(!updatedOrder) { throw new ErrorHandler(404, 'Error: Order not found!') }
    else {
        if (req.body.order_date != null) {updatedOrder.order_date = req.body.date}
        if (req.body.status != null) {updatedOrder.status = req.body.status}
        updatedOrder.updated_by = req.decoded.id
        updatedOrder.updated_at = Date()
        await updatedOrder.save()
        if(req.body.items) {
            await OrderItem.destroy({where: {order_id: updatedOrder.id}})
            for (let index = 0; index < req.body.items.length; index++) {
                const updatedOrderItem = new OrderItem()
                const item = await Item.findOne({ where: { id: req.body.items[index].item_id }})
                if (req.body.items[index].item_id != null) {
                    updatedOrderItem.item_id = req.body.items[index].item_id
                    updatedOrderItem.order_id = updatedOrder.id
                    if (req.body.items[index].quantity) {
                        updatedOrderItem.quantity = req.body.items[index].quantity
                        updatedOrderItem.payment = req.body.items[index].quantity * item.selling_price
                    } else {
                        updatedOrderItem.quantity = 0
                        updatedOrderItem.payment = 0
                    }
                    updatedOrderItem.created_by = req.decoded.id
                    updatedOrderItem.updated_by = req.decoded.id
                }
                updatedOrderItem.save()               
            }
        }
        logsHelper.infoLogger(updatedOrder.id, ' order has been updated by '+ req.decoded.id)
        req.params.id = updatedOrder.id
        return this.find(req)
    }   
}

 async function remove(req) {
    const orderToRemove = await Order.findOne({ where:{ id:req.params.id } })
    if (!orderToRemove) { throw new ErrorHandler(404, 'Humpty dumpty, Order not Found!.') }
    else {
        logsHelper.infoLogger(orderToRemove.id, ' order has been deleted')
        await OrderItem.destroy({ where:{ order_id:req.params.id }})
        return Order.destroy({ where:{ id:req.params.id } })
    }      
}
module.exports = { list, create, find, update, remove, }