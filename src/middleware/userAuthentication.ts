import jwt from "jsonwebtoken";

export const userAuthentication = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access Denied");

    const verified = await jwt.verify(token, "testing");
    req.user = verified;
    next();
  } catch (error) {
    return res.send(400).send("Invalid Token");
  }
};
