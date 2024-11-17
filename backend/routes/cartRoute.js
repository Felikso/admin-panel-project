import express from 'express'
import { addToCart, removeFromCart, getCart } from '../controllers/cartController.js'
import { authMiddleware, authOrderMiddleware } from '../middleware/auth.js'
import { verifyToken } from '../middleware/verifyToken.js'

const cartRoute = express.Router();

cartRoute.post('/add',authOrderMiddleware,addToCart)
cartRoute.post('/remove',authOrderMiddleware,removeFromCart)
cartRoute.post('/get',authOrderMiddleware,getCart)

export default cartRoute;
