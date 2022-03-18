import express from "express"
import DBWrapper from "../../../db/DBWrapper"
import path from "path"
import {V1_EXPORT_DB_PATH} from "../constants"


const router = express.Router()

router.get(V1_EXPORT_DB_PATH, async (req, res) => {
    const instance = DBWrapper.getInstance()

    const fileName = '/db-export.sqlite'
    const filePath = path.join(__dirname, fileName)

    await instance.saveDbToFile(filePath)

    res.send({message: `Database exported! Location: ${filePath}`})
})


export = router