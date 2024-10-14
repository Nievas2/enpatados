import express from 'express'
import { authToken } from '../middlewares/middleware'
import {
  getOrdersByUserId,
  getOrderDetails,
  createOrder,
  processPayment,
  updateOrderStatus,
  deleteOrder
} from '../controllers/order/index.controller'

const router = express.Router()

router.get('/user/:id', authToken, getOrdersByUserId)

router.get('/details/:id', authToken, getOrderDetails)

router.post('/', authToken, createOrder)

router.post('/payment', authToken, processPayment)

router.put('/:id', authToken, updateOrderStatus)

router.delete('/:id', authToken, deleteOrder)

export default router
