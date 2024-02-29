import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const userAuthentication = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access Denied");

    const verified: any = await jwt.verify(token, "testing");
    const user = await User.findOne({
      where: {
        email: verified.email,
      },
    });

    if (user) {
      req.user = user;
      next();
    } else {
      return res.send({ message: "User not found" });
    }
  } catch (error) {
    return res.status(400).send("Invalid Token");
  }
};
