import { DataTypes, Model, ModelCtor } from "sequelize";
import { database } from "../config/database.js";

export interface IGroceryAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface IGroceryInstance
  extends Model<IGroceryAttributes>,
    IGroceryAttributes {}

const Grocery = database.define<IGroceryInstance>(
  "grocery",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
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

export { Grocery };
