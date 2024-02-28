import express from "express";
import bodyParser from "body-parser";

import { database } from "./config/database.js";

import userRouter from "./routers/users.js";
import groceryRouter from "./routers/groceries.js";

const app = express();

database
  .authenticate()
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.log("Error: ", err));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/grocery", groceryRouter);

app.use("/", (req, res, next) => {
  return res.send("Hello World");
});

app.listen(3000, () => {
  console.log("App is runnig on port :- 3000");
});
