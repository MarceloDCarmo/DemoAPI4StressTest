import { User } from '@prisma/client'
import dayjs from 'dayjs'
import { CardType } from '../enums/CardType'
import { ValidationError } from '../errors/ValidationError'
import { CardRepository } from '../repositories/CardRepository'
import { UserRepository } from '../repositories/UserRepository'

export class CardService {
    async create(user: User, cardType: CardType, active: boolean) {
        if (!user) {
            throw new ValidationError("User must not be null", 400)
        }

        const userId = user.id

        const randomMonth = Math.floor(Math.random() * 6)
        const randomYear = Math.floor(Math.random() * 3)

        const expireAt = dayjs().date(30).add(randomMonth, 'month').add(randomYear, 'year').toDate()

        const creditCard = CardRepository.create(
            {
                data: {
                    userId,
                    cardNumber: this.generateCardNumber(),
                    type: cardType,
                    active,
                    expireAt
                }
            })

        return creditCard
    }

    async createCardList(user: User) {
        if (!user) {
            throw new ValidationError("User must not be null", 400)
        }

        for (let i = 0; i < Object.values(CardType).length; i++) {
            this.create(user, Object.values(CardType)[i], i % 2 == 0 ? true : false)
        }
    }

    async findAllByUserId(userId: string) {
        if (!userId) {
            throw new ValidationError("User must not be null", 400)
        }

        const userExists = await UserRepository.findFirst({ where: { id: userId } })

        if (!userExists) {
            throw new ValidationError("User not found", 404)
        }

        const cardList = await CardRepository.findMany({ where: { userId } })

        return cardList
    }

    async findById(cardId: string) {
        if (!cardId) {
            throw new ValidationError("Card Id must not be null", 400)
        }

        const card = await CardRepository.findFirst({ where: { id: cardId } })

        if(!card) {
            throw new ValidationError("Card not found", 404);
        }

        return card
    }

    async setActiveStatus(cardId: string, status: boolean) {
        if (!cardId || status == null) {
            throw new ValidationError("Card id and new status must not be null", 422)
        }

        let card = await CardRepository.findFirst({ where: { id: cardId } })

        if (!card) {
            throw new ValidationError("Card not found", 404)
        }

        if (card.active == status) {
            throw new ValidationError(`Card is already ${card.active ? 'active' : 'inactive'}`, 400)
        }

        card = await CardRepository.update(
            {
                where: {
                    id: cardId
                },
                data: {
                    active: status
                }
            })
    }

    private generateCardNumber(): string {
        let cardNumber: Array<string> = []

        for (let i = 0; i < 4; i++) {
            let num = Math.floor(Math.random() * 8888 + 1111)

            cardNumber.push(num.toString())
        }

        return cardNumber.join("-")
    }
}