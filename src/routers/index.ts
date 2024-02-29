import express from "express";

import userRouter from "./users.js";
import groceryAdminRouter from "./groceries.js";

const app = express();

app.use("/users", userRouter);
app.use("/groceries", groceryAdminRouter);
