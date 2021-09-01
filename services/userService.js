const User = require('../models').userModel
const Level = require('../models').levelModel
const Person = require('../models').personModel
const { ErrorHandler } = require("../helpers/errorHelper")
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const logsHelper = require('../helpers/logsHelper')
const auth = require('../middlewares/auth')
dotenv.config()

async function hasher(password) {
    const saltRounds = parseInt(process.env.SALT_ROUNDS)
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

async function list() {
    const users = await User.findAll({attributes: ['id', 'username', 'email', 'status', 'joinDate']})
    if (!users.length) { throw new ErrorHandler (404, 'Huh No records found.') }
    return users
}

async function create(req, _res) {
    const level = await Level.findOne({where: {id: req.body.levelId}})
    if(!level) {throw new ErrorHandler (404, 'Aargh That level doesn\'t exist.')}
    const user =  new User({
        username: req.body.username,
        email: req.body.email,
        password: await hasher(req.body.password),
        saltRounds: parseInt(process.env.SALT_ROUNDS),
        joinDate: new Date(Date.now()),
        status: req.body.status || false,
        levelId: req.body.levelId,
        createdBy: req.decoded.id,
        updatedBy: null,
    })
    const newUser = await user.save()
        // Covering private parts...
        delete user.dataValues.saltRounds
        delete user.dataValues.password
        delete user.dataValues.tokenExpiry    

    const person = new Person({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobilephone: req.body.mobilephone,
        organization: req.body.organization,
        userId: user.dataValues.id,
        createdBy: req.decoded.id,
        updatedBy: null,
    })
    const newPerson = await person.save()
    console.log(user.dataValues.id)
    return user
}

async function find (id) {
    const foundUser = await User.findOne({where:{id: id}, attributes: ['id', 'username', 'email', 'status', 'joinDate', 'tokenExpiry']})
    if (!foundUser) { throw new ErrorHandler(404, 'A\'ight, User not Found!.') }
    else{ return foundUser }
}

async function update (req, id) {
    // first update the user object
    const updatedUser = await User.findOne({where:{id: req.params.id}})
    if(!updatedUser) { throw new ErrorHandler(404, 'User not updated') }
    else {
        if  (req.body.username != null ) { updatedUser.username = req.body.username }
        if ( req.body.email != null ) { updatedUser.email = req.body.email }
        if ( req.body.status != null ) { updatedUser.status = req.body.status }
        if ( req.body.levelId != null ) { updatedUser.levelId = req.body.levelId }
        if ( req.body.password != null ) {
            updatedUser.password = hasher(req.body.password)
            updatedUser.saltRounds = parseInt(process.env.saltRounds)
        }
        updatedUser.updatedBy = req.decoded.id
        updatedUser.updatedAt = Date()
        await updatedUser.save()

        // Then upate the person object
        const updatedPerson = await Person.findOne({where: {userId: req.params.id}})
        if (req.body.firstname != null) { updatedPerson.firstname = req.body.firstname }
        if (req.body.lastname != null) { updatedPerson.lastname = req.body.lastname }
        if (req.body.mobilephone != null) { updatedPerson.mobilephone = req.body.mobilephone }
        if (req.body.organization != null) { updatedPerson.organization = req.body.organization }
        updatedPerson.updatedBy = req.decoded.id
        updatedPerson.updatedAt = Date(0)
        await updatedPerson.save()
            delete updatedUser.dataValues.saltRounds
            delete updatedUser.dataValues.password
            delete updatedUser.dataValues.tokenExpiry        
        return updatedUser
    }   
}

async function remove(id) {
    const userToRemove = await User.findOne({where:{id: id}})
    if (!userToRemove) { throw new ErrorHandler(404, 'Humpty dumpty, User not Found!.') }
    else {
        logsHelper.infoLogger(userToRemove.id, 'has been deleted')
        userToRemove.destroy()
        return userToRemove.id
    }
}

async function login(req) {
    return await auth.login(req)
}

module.exports = { list, create, find, update, remove, login, }