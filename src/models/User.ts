import { DataTypes } from "sequelize";
import { database } from "../config/database.js";

const User = database.define(
  "user",
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

User.sync().then(() => {
  console.log("User table created");
});

export { User };
