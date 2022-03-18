import dbWrapper from '../../../db/DBWrapper'
import {CreatePawnDto} from "./dto/CreatePawn.dto"
import PawnAssignedToNullCustomerError from "./errors/PawnAssignedToNullCustomer.error"
import {getPawnExpiryDate} from "./pawn.util";

const db = dbWrapper.getInstance()


async function createPawn(dto: CreatePawnDto) {
    const nowInSeconds = Math.floor(new Date().getTime() / 1000)
    try {
        await db.createPawn(dto, nowInSeconds, getPawnExpiryDate(nowInSeconds))
    } catch (e) {
        console.error(e)
        if (e instanceof Error && e.message === 'FOREIGN KEY constraint failed') {
            throw new PawnAssignedToNullCustomerError()
        }
    }
}

async function getPawns() {
    return db.getPawns()
}

async function getPawnsByLoaner(loanerId: number) {
    return db.getPawnsByLoanerId(loanerId)
}


export {
    createPawn,
    getPawns,
    getPawnsByLoaner
}