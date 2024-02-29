import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/User.js";

export const adminAuthentication = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access Denied");

    const verified: any = await jwt.verify(token, "testing");
    const user: any = await User.findOne({
      where: {
        email: verified.email,
      },
    });
    if (user.type === "admin") {
      req.user = user;
    } else {
      return res.status(400).send("Invalid Token");
    }
    next();
  } catch (error) {
    return res.send(400).send("Invalid Token");
  }
};
