import 'reflect-metadata'
import express from 'express'
import customersRoute from "./api/v1/customers/customers.route"
import pawnsRoute from './api/v1/pawns/pawns.route'

import errorHandler from "./api/v1/errorHandler"


const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    const exportDbRoute = require("./api/v1/exportDB/exportDb.route")
    const swaggerRoute = require("./api/v1/swagger/swagger.route")

    app.use(swaggerRoute)
    app.use(exportDbRoute)
}

app.use(pawnsRoute)
app.use(customersRoute)

app.use(errorHandler)


export = app