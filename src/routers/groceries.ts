import express from "express";
import {
  addGrocery,
  addInventeryItemsGrocery,
  deleteGrocery,
  getAllGrocery,
  getGrocery,
  updateGrocery,
} from "../controllers/groceryController.js";

import { adminAuthentication } from "../middleware/adminAuthentication.js";
import { userAuthentication } from "../middleware/userAuthentication.js";

const router = express.Router();

router.get("/get-all-groceries", userAuthentication, getAllGrocery);

router.get("/get-grocery/:id", userAuthentication, getGrocery);

router.post("/add-grocery", adminAuthentication, addGrocery);

router.put("/update-grocery/:id", adminAuthentication, updateGrocery);

router.patch(
  "/grocery-inventory/:id",
  adminAuthentication,
  addInventeryItemsGrocery
);

router.delete("/delete-grocery/:id", adminAuthentication, deleteGrocery);

export default router;
