import express from 'express'
import { authMiddleware, authOrderMiddleware } from '../middleware/auth.js'
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, removeOrder, verifyOrderCode } from '../controllers/orderController.js'
import { verifyUrl, verifyOrderUrl, userOrdersUrl } from '../variables.js'

const orderRoute = express.Router();

orderRoute.post('/place',placeOrder,authOrderMiddleware) //authMiddleware
orderRoute.post(verifyUrl,verifyOrder)
orderRoute.post(verifyOrderUrl+'/:_id',verifyOrderCode)
orderRoute.post(userOrdersUrl,authOrderMiddleware,userOrders) //authMiddleware
orderRoute.get('/list',listOrders)
orderRoute.post('/status',updateStatus)
orderRoute.post('/remove',removeOrder)

export default orderRoute