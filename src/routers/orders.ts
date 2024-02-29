import express from "express";
import { userAuthentication } from "../middleware/userAuthentication.js";
import { createOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/place-order", userAuthentication, createOrder);

router.get("/get-orders-history", userAuthentication, getOrders);

export default router;
