import express from "express"
import {createCustomer, getAllCustomers} from "./customer.service"
import {plainToInstance} from "class-transformer"
import {CreateCustomerDto} from "./dto/CreateCustomer.dto"
import {validateSync} from "class-validator"
import {V1_CUSTOMERS_PATH} from "../constants"

const router = express.Router()


router.get(V1_CUSTOMERS_PATH, async (req, res) => {
        res.send(await getAllCustomers())
    }
)

router.post(V1_CUSTOMERS_PATH, async (req, res) => {
        const createCustomerDto = plainToInstance(CreateCustomerDto, req.body)

        const validationErrors = validateSync(createCustomerDto)

        if (validationErrors.length)
            return res.status(400).send(validationErrors)

        await createCustomer(createCustomerDto)
        res.status(201).send()
    }
)


export default router