import jwt, { JwtPayload } from "jsonwebtoken";
interface IToken {
  id: string;
  email: string;
  type: string;
  iat: number;
}

export const adminAuthentication = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access Denied");

    const verified: any = await jwt.verify(token, "testing");
    console.log(verified);
    if (verified.type === "admin") {
      req.user = verified;
    } else {
      return res.status(400).send("Invalid Token");
    }
    next();
  } catch (error) {
    return res.send(400).send("Invalid Token");
  }
};
