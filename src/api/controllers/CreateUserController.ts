import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

class UserController {
    async create (req:Request, res:Response) {
        const { username, password } = req.body

        const createUserService = new UserService()

        const createdUser = await createUserService.create( username, password )

        return res.status(201).json({
            status: 'Success',
            id: createdUser.id,
            username: createdUser.username
        })
    }
}

export default new UserController()