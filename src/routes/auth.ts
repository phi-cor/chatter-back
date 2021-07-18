import { Router } from "express"
import { AuthController } from "@controller/AuthController"
const route = Router()
route.post('/auth/login', AuthController.login)

module.exports(route)