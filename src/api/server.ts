import * as dotenv from 'dotenv'
import  express, { NextFunction, Request, Response } from 'express'
import "express-async-errors"
import { ValidationError } from './errors/ValidationError'
import router from './routes'

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../../swagger.json'

const app = express()

dotenv.config()
const port = process.env.PORT

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(express.json())

app.use(router)

app.use((err: Error, req: Request, res: Response, next:NextFunction) => {
    if(err instanceof Error){
        let statusCode = 500

        if(err instanceof ValidationError) statusCode = err.statusCode

        return res.status(statusCode).json({
            status: "Error",
            message: err.message
        })
    }
})

app.listen(port, () => console.log(`Server listening on port ${port}`))