import { Router } from 'express'
import AuthenticateController from './controllers/AuthenticateController'
import CardController from './controllers/CardController'
import UserController from './controllers/UserController'
import { authenticateMiddleware } from './middlewares/authMiddleware'

//TODO: revisar o caminho dos endpoints

const router = Router()

router.get("/", (req, res) => res.send("All right for the tests!"))

router.post('/v1/auth', AuthenticateController.handle)
router.post('/v1/users', UserController.create)
router.get('/v1/users/:userId/cards', authenticateMiddleware, CardController.findAllByUser)
router.get('/v1/cards/:cardId', authenticateMiddleware, CardController.findById)
router.put('/v1/cards', authenticateMiddleware, CardController.setActiveStatus)

export default router