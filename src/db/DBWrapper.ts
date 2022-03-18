import initSqlJs, {Database} from "sql.js"
import fs from "fs"
import {CreateCustomerDto} from "../api/v1/customers/dto/CreateCustomer.dto"
import {plainToClass} from "class-transformer"
import {Customer} from "../api/v1/customers/model/Customer"
import {CreatePawnDto} from "../api/v1/pawns/dto/CreatePawn.dto"
import {Pawn} from "../api/v1/pawns/model/Pawn"

class DBWrapper {
    static #classInstance: DBWrapper

    #db: Promise<Database>

    static init(initScriptPath: string) {
        if (!DBWrapper.#classInstance) {
            DBWrapper.#classInstance = new DBWrapper(initScriptPath)
        }
    }

    static getInstance() {
        if (!DBWrapper.#classInstance) {
            throw new Error('You must call init() before you can get a DB instance.')
        }

        return DBWrapper.#classInstance
    }

    private constructor(public initScriptPath: string) {
        this.#db = new Promise((res, rej) => {
            initSqlJs({}).then((SQL) => {
                const initScript = fs.readFileSync(initScriptPath).toString()
                const databaseInstance = new SQL.Database()
                databaseInstance.run(initScript)

                res(databaseInstance)
            }).catch(err => {
                console.log(err)
                rej(err)
            })
        })
    }

    async createCustomer(dto: CreateCustomerDto) {
        const database = await this.#db

        const first_name = '@firstName'
        const last_name = '@lastName'

        const sql = `INSERT INTO customer(firstName, lastName)
                     VALUES (${first_name}, ${last_name})`

        const stmt = database.prepare(sql)
        stmt.bind({
            [first_name]: dto.firstName,
            [last_name]: dto.lastName
        })
        stmt.step()
        stmt.free()
    }

    async getCustomers() {
        const database = await this.#db

        const customers: Customer[] = []

        const stmt = database.prepare('SELECT * FROM customer')
        while (stmt.step()) {
            const row = stmt.getAsObject()
            customers.push(plainToClass(Customer, row))
        }
        stmt.free()

        return customers
    }

    async createPawn(dto: CreatePawnDto, loanDateUnixSeconds: number, expiryDateUnixSeconds: number) {
        const database = await this.#db

        const description = '@description'
        const loan_date = '@loan_date'
        const loan_sum = '@loan_sum'
        const expiry_date = '@expiry_date'
        const loaned_by = '@loaned_by'

        let sql = `
            INSERT INTO pawn(description, loanDate, loanSum, expiryDate, loanedBy)
            VALUES (${description}, ${loan_date}, ${loan_sum}, ${expiry_date}, ${loaned_by})
        `

        const stmt = database.prepare(sql)
        stmt.bind({
            [description]: dto.description,
            [loan_date]: loanDateUnixSeconds,
            [loan_sum]: dto.loanSum,
            [expiry_date]: expiryDateUnixSeconds,
            [loaned_by]: dto.loanedBy
        })
        stmt.step()
        stmt.free()
    }

    async getPawns() {
        const database = await this.#db

        const pawns: Pawn[] = []

        const stmt = database.prepare('SELECT * FROM pawn')
        while (stmt.step()) {
            const row = stmt.getAsObject()
            pawns.push(plainToClass(Pawn, row))
        }
        stmt.free()

        return pawns
    }

    async getPawnsByLoanerId(loanerId: number) {
        const database = await this.#db

        const pawns: Pawn[] = []

        const loaned_by = '@loaned_by'

        const stmt = database.prepare(`SELECT *
                                       FROM pawn
                                       WHERE loanedBy = ${loaned_by}`)
        stmt.bind({[loaned_by]: loanerId})

        while (stmt.step()) {
            const row = stmt.getAsObject()
            pawns.push(plainToClass(Pawn, row))
        }
        stmt.free()

        return pawns
    }

    async saveDbToFile(filePath: string) {
        const database = await this.#db

        fs.writeFileSync(filePath, Buffer.from(database.export()))
    }


}

export default DBWrapper