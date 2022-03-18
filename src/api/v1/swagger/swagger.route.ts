import YAML from "yamljs"
import express from "express"
import {V1_SWAGGER_PATH} from "../constants"

const swaggerUi = require('swagger-ui-express')


const router = express.Router()

const swaggerDocument = YAML.load('./src/api/v1/swagger.yaml')

router.use(V1_SWAGGER_PATH, swaggerUi.serve)
router.get(V1_SWAGGER_PATH, swaggerUi.setup(swaggerDocument, {explorer: true}))


export = router