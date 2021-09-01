'use strict'
const { v4: uuidv4 } = require('uuid')
const dotenv = require('dotenv').config()
const Level = require('../models').levelModel
const bcrypt = require('bcrypt')

async function getLevel (name) {
    var levelId = await Level.findOne({ where: {name: name}, attributes: ["id"] })
    levelId = JSON.stringify(levelId)
    levelId = JSON.parse(levelId)
    return levelId.id
}

async function hasher(password) {
    const saltRounds = parseInt(process.env.SALT_ROUNDS)
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        console.log(await getLevel(process.env.LEVEL_ONE_NAME))
        await queryInterface.bulkInsert('Users', [
            {
                id: uuidv4(),
                username: process.env.LEVEL_ONE_NAME,
                email: process.env.LEVEL_ONE_NAME+'@example.com',
                password: await hasher(process.env.DEMO_PASSWORD),
                saltRounds: parseInt(process.env.SALT_ROUNDS),
                joinDate: new Date(Date.now()),
                status: true,
                levelId: await getLevel(process.env.LEVEL_ONE_NAME),
                createdBy: 'System',
                createdAt: new Date(Date.now()),
            },
            {
                id: uuidv4(),
                username: process.env.LEVEL_TWO_NAME,
                email: process.env.LEVEL_TWO_NAME+'@example.com',
                password: await hasher(process.env.DEMO_PASSWORD),
                saltRounds: parseInt(process.env.SALT_ROUNDS),
                joinDate: new Date(Date.now()),
                status: true,
                levelId: await getLevel(process.env.LEVEL_TWO_NAME),
                createdBy: 'System',
                createdAt: new Date(Date.now()),
            },
            {
                id: uuidv4(),
                username: process.env.LEVEL_THREE_NAME,
                email: process.env.LEVEL_THREE_NAME+'@example.com',
                password: await hasher(process.env.DEMO_PASSWORD),
                saltRounds: parseInt(process.env.SALT_ROUNDS),
                joinDate: new Date(Date.now()),
                status: true,
                levelId: await getLevel(process.env.LEVEL_THREE_NAME),
                createdBy: 'System',
                createdAt: new Date(Date.now()),
            }
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
         await queryInterface.bulkDelete('Users', null, {})
    }
}
