const Client = require('../models').Client
const Person = require('../models').Person
const { ErrorHandler } = require("../helpers/error")
const auth = require('../middlewares/auth')
const logsHelper = require('../helpers/logger')

async function list() {
    const clients = await Client.findAll({ include: 'person' })
    if (!clients.length) { throw new ErrorHandler (404, 'Huh No records found.') }
    return clients
}

async function create(req, _res) {
    const client =  new Client({
        last_purchase: req.body.last_purchase,
        status: req.body.status || false,
        created_by: req.decoded.id,
        updated_by: null,
        person: [{
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mobilephone: req.body.mobilephone,
            created_by: req.decoded.id,
            updated_by: null,
        }]
    }, {include: ['person']})
    const newClient = await client.save({ include: ['person'] })
    return newClient
}

async function find (id) {
    const foundClient = await Client.findOne({where:{id: id}, include: 'person'})
    if (!foundClient) { throw new ErrorHandler(404, 'A\'ight, Client not Found!.') }
    else{ return foundClient }
}

async function update (req, id) {
    // first update the client object
    const updatedClient = await Client.findOne({where:{id: req.params.id}, include: ['person'] })
    if(!updatedClient) { throw new ErrorHandler(404, 'Hmm! Client not found.') }
    else {
        if  (req.body.last_purchase != null ) { updatedClient.last_purchase = req.body.last_purchase }
        if ( req.body.status != null ) { updatedClient.status = req.body.status }
        updatedClient.updated_by = req.decoded.id
        updatedClient.updated_at = Date()
        await updatedClient.save()

        // Then upate the person object
        const updatedPerson = await Person.findOne({where: {client_id: req.params.id}})
        if (req.body.firstname != null) { updatedPerson.firstname = req.body.firstname }
        if (req.body.lastname != null) { updatedPerson.lastname = req.body.lastname }
        if (req.body.mobilephone != null) { updatedPerson.mobilephone = req.body.mobilephone }
        updatedPerson.updated_by = req.decoded.id
        updatedPerson.updated_at = Date(0)
        await updatedPerson.save()
        logsHelper.infoLogger(updatedClient.id, ' client has been updated')   
        return await Client.findOne({where:{id: req.params.id}, include: ['person'] })
    }   
}

async function remove(id) {
    const clientToRemove = await Client.findOne({where:{id: id}})
    if (!clientToRemove) { throw new ErrorHandler(404, 'Humpty dumpty, Client not Found!.') }
    else {
        logsHelper.infoLogger(clientToRemove.id, ' client has been deleted')
        clientToRemove.destroy()
        return clientToRemove.id
    }
}


module.exports = { list, create, find, update, remove }