import { hash } from 'bcryptjs'
import process from 'process'
import { ValidationError } from '../errors/ValidationError'
import { UserRepository } from '../repositories/UserRepository'
import { CreditCardService } from './CreditCardService'

export class UserService {

    async create(username: string, password: string) {
        if (!username || !password) {
            throw new ValidationError("Invalid username or password", 422)
        }

        const usernameAlreadyExists = await UserRepository.findFirst({ where: { username } })

        if (usernameAlreadyExists) {
            throw new ValidationError("Username already in use", 400)
        }

        const hashedPassword = await hash(password, parseInt(process.env.SALT!))

        const user = await UserRepository.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        const creditCardService = new CreditCardService()
        creditCardService.create(user)

        return user
    }

    async getById(id: string) {
        if (!id) {
            throw new ValidationError("User id must not be null", 400)
        }

        const user = await UserRepository.findFirst({ where: { id } })

        if (!user) {
            throw new ValidationError("User not exists", 404)           
        }

        return {
            id: user.id,
            userName: user.username,
            createdAt: user.created_at
        }
    }
}