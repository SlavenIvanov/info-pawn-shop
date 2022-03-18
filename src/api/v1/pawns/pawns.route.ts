import express from "express"
import {plainToInstance} from "class-transformer"
import {CreatePawnDto} from "./dto/CreatePawn.dto"
import {validateSync} from "class-validator"
import {createPawn, getPawns, getPawnsByLoaner} from "./pawn.service"
import {V1_PAWNS_PATH} from "../constants"

const router = express.Router()

router.get(V1_PAWNS_PATH, async (req, res) => {
    const {loanedBy: loanedByParam} = req.query

    if (loanedByParam) {
        const loanedById = Number(loanedByParam)

        if (!Number.isInteger(loanedById))
            return res.status(400)

        return res.send(await getPawnsByLoaner(loanedById))
    }

    res.send(await getPawns())
//    TODO add try/catch to all routes
})

router.post(V1_PAWNS_PATH, async (req, res, next) => {
    const createPawnDto = plainToInstance(CreatePawnDto, req.body)

    const validationErrors = validateSync(createPawnDto)

    if (validationErrors.length)
        return res.status(400).send(validationErrors)

    try {
        await createPawn(createPawnDto)
        res.status(201).send()
    } catch (e) {
        next(e)
    }
})


export default router