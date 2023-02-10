import { Router } from 'express'
import AuthenticateController from './controllers/AuthenticateController'
import UserController from './controllers/CreateUserController'

const router = Router()

router.get("/", (req, res) => {throw new Error("Erro")})
// router.get("/", (req, res) => res.send("All right for the tests!"))

router.post("/v1/auth", AuthenticateController.handle)
router.post("/v1/users", UserController.create)

export default router