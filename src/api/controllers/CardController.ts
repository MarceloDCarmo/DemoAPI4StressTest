import { Request, Response } from 'express'
import { CardService } from '../services/CardService'

class CardController {
    async findAllByUser(req: Request, res: Response) {
        const { userId } = req.params

        const service = new CardService()

        const cardsList = await service.findAllByUserId(userId)

        return res.status(200).json(cardsList)
    }

    async findById(req: Request, res: Response) {
        const { cardId } = req.params

        const service = new CardService()

        const card = await service.findById(cardId)

        return res.status(200).json(card)
    }
}

export default new CardController()