import express from 'express'
import { addToCart, removeFromCart, getCart } from '../controllers/cartController.js'
import { authMiddleware, authOrderMiddleware } from '../middleware/auth.js'
import { verifyToken } from '../middleware/verifyToken.js'

const cartRoute = express.Router();

cartRoute.post('/add',authMiddleware,addToCart)
cartRoute.post('/remove',authMiddleware,removeFromCart)
cartRoute.post('/get',authMiddleware,getCart)

export default cartRoute;
