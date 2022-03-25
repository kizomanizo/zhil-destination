'use strict'

const { v4: uuidv4 } = require('uuid')
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('insurances', [{
            id: uuidv4(),
            name: process.env.INSURANCE_ONE_NAME,
            description: process.env.INSURANCE_DESCRIPTION,
            status: true,
            created_by: uuidv4(),
            created_at: new Date(Date.now()),
        }, {
            id: uuidv4(),
            name: process.env.INSURANCE_TWO_NAME,
            description: process.env.INSURANCE_DESCRIPTION,
            status: true,
            created_by: uuidv4(),
            created_at: new Date(Date.now()),
        },{
            id: uuidv4(),
            name: process.env.INSURANCE_THREE_NAME,
            description: process.env.INSURANCE_DESCRIPTION,
            status: false,
            created_by: uuidv4(),
            created_at: new Date(Date.now()),
        }], {})
    },

    down: async (queryInterface, Sequelize) => {
         await queryInterface.bulkDelete('insurances', null, {})
    }
}
