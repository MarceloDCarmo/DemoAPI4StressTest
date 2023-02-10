import { User } from '@prisma/client'
import dayjs from 'dayjs'
import { ValidationError } from '../errors/ValidationError'
import { CreditCardRepository } from '../repositories/CreditCardRepository'

export class CreditCardService {
    async create(user: User) {
        if (user == null) {
            throw new ValidationError("User must not be null", 400)
        }

        const userId = user.id

        const randomMonth = Math.floor(Math.random() * 6)
        const randomYear = Math.floor(Math.random() * 3)

        const expireAt = dayjs().date(30).add(randomMonth, 'month').add(randomYear, 'year').toDate()

        const creditCard = CreditCardRepository.create(
            {
                data: {
                    userId,
                    cardNumber: this.generateCardNumber(),
                    expireAt
                }
            })

        return creditCard
    }

    private generateCardNumber(): string {
        let cardNumber: Array<string> = []

        for (let i = 0; i < 4; i++) {
            let num = Math.floor(Math.random() * 9999 + 1111)

            cardNumber.push(num.toString())
        }

        return cardNumber.join("-")
    }
}