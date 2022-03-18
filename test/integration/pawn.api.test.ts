import DBWrapper from "../../src/db/DBWrapper"
import {V1_PAWNS_PATH} from "../../src/api/v1/constants"
import {Application} from "express"

const request = require('supertest')

let app: Application

beforeEach(() => {
    DBWrapper.init('./test/db/init_test.sql')
    app = require('../../src/app')
})

test('Fetch all Pawns, expecting proper Pawn count and request response', async () => {
    await request(app)
        .get(V1_PAWNS_PATH)
        .send()
        .expect(200)
        .then((res: { body: string | any[] }) => {
            expect(res.body.length).toEqual(4)
        })
})

test('Create pawn with correct data, expecting created response, and more pawns than initialized', async () => {
    await request(app)
        .post(V1_PAWNS_PATH)
        .send({
            "description": "A cactus",
            "loanSum": 199,
            "loanedBy": 1
        })
        .expect(201)
        .then(async (res: { body: string | any[] })=>{
            const pawns = await (await DBWrapper.getInstance()).getPawns()
            expect(pawns.length).toEqual(5)
        })
})

test('Create a pawn with an unacceptable loanSum, expecting a bad request response', async () => {
    await request(app)
        .post(V1_PAWNS_PATH)
        .send({
            "description": "A cactus",
            "loanSum": 99,
            "loanedBy": 1
        })
        .expect(400)
})

test('Create a pawn, belonging to a non-existing Customer, expecting a bad request response', async () => {
    await request(app)
        .post(V1_PAWNS_PATH)
        .send({
            "description": "A cactus",
            "loanSum": 199,
            "loanedBy": 20
        })
        .expect(400)
})