import { Grocery } from "../models/Grocery.js";
import { Order, OrderItem } from "../models/Order.js";
import { v4 as uuid } from "uuid";

export const createOrder = async (req, res, next) => {
  try {
    const { groceries } = req.body;

    const order: any = await Order.create({
      user_order_id: uuid(),
      user_id: req.user.id,
      total_amount: 0,
    });

    let total_amount = 0;

    for (let item of groceries) {
      const { id, quantity } = item;

      const grocery: any = await Grocery.findByPk(id);

      if (!grocery || grocery.quantity == 0) {
        return res
          .status(404)
          .send({ message: "Grocery item not found or out of stock" });
      }

      if (grocery.quantity < quantity) {
        return res.status(404).send({ message: "Quantity exceed." });
      }

      await OrderItem.create({
        order_id: order.id,
        grocery_id: id,
        quantity,
      });

      total_amount += grocery.price * quantity;
      grocery.quantity -= quantity;
      await grocery.save();
    }

    order.total_amount = total_amount;

    await order.save();

    return res.send(order);
  } catch (error) {
    return res.send({ message: error.message });
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        user_id: req.user.id,
      },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Grocery,
            },
          ],
        },
      ],
    });
    return res.send(order);
  } catch (error) {
    return res.send({ message: error.message });
  }
};
