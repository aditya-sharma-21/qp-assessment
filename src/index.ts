import express from "express";
import bodyParser from "body-parser";

import { database } from "./config/database.js";

import userRouter from "./routers/users.js";
import groceryRouter from "./routers/groceries.js";
import orderRouter from "./routers/orders.js";

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/grocery", groceryRouter);
app.use("/api/order", orderRouter);

app.use("/", (req, res, next) => {
  return res.send("Hello World");
});

app.listen(3000, async () => {
  try {
    await database.authenticate();
    console.log("Database Connected successfully!");
    console.log("App is runnig on port :- 3000");
  } catch (error) {
    console.log("Connection error :- ", error.message);
  }
});
