import { DataTypes } from "sequelize";
import { database } from "../config/database.js";

const Grocery = database.define(
  "grocery",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Grocery.sync().then(() => {
  console.log("Grocery table created");
});

export { Grocery };
