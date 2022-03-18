import dbWrapper from '../../../db/DBWrapper'
import {CreateCustomerDto} from "./dto/CreateCustomer.dto"

const db = dbWrapper.getInstance()


async function getAllCustomers() {
    return db.getCustomers()
}

async function createCustomer(dto: CreateCustomerDto){
    return db.createCustomer(dto)
}


export {
    getAllCustomers,
    createCustomer
}