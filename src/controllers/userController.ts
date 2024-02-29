import { IUsersInstance, User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

export const registerUser = async (req, res, next) => {
  try {
    let { username, email, password, type } = req.body;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password,
      type,
    });

    const token = jwt.sign({ username, email, type }, process.env.SECRET_TOKEN);

    return res.send({ user, token });
  } catch (error) {
    return res.send(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const user: IUsersInstance = await User.findOne({
      //todo
      where: {
        [Op.or]: [
          {
            username: login,
          },
          {
            email: login,
          },
        ],
      },
    });

    let validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) return res.status(400).send("Invalid Password");

    const token = jwt.sign(
      { id: user.username, email: user.email, type: user.type },
      process.env.SECRET_TOKEN
    );
    res.send({ user, token });
  } catch (error) {
    return res.send(error);
  }
};
