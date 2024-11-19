import express from 'express'
import { authMiddleware, authOrderMiddleware, adminMiddleware } from '../middleware/auth.js'
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, removeOrder, verifyOrderCode } from '../controllers/orderController.js'
import { verifyUrl, verifyOrderUrl, userOrdersUrl } from '../variables.js'

const orderRoute = express.Router();

orderRoute.post('/place',placeOrder,authMiddleware) //authMiddleware
orderRoute.post(verifyUrl,verifyOrder)
orderRoute.post(verifyOrderUrl+'/:_id',verifyOrderCode)
orderRoute.post(userOrdersUrl,userOrders) //authMiddleware
orderRoute.get('/list',authMiddleware,listOrders)
orderRoute.post('/status',updateStatus)
orderRoute.post('/remove',removeOrder)

export default orderRoute