import DBWrapper from "./db/DBWrapper"
DBWrapper.init(process.env.SQLITE_INIT_SCRIPT!)

import open from 'open'
import app from "./app"
import {V1_SWAGGER_PATH} from "./api/v1/constants"


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server started on port: ${port}👂`)
})

if (process.env.NODE_ENV === "development"){
    open(`http://localhost:${port}${V1_SWAGGER_PATH}`)
}