import { DataTypes, Model } from "sequelize";
import { database } from "../config/database.js";

export interface IUsersAttributes {
  id: number;
  username: number;
  email: number;
  password: string;
  type: string;
}

export interface IUsersInstance
  extends Model<IUsersAttributes>,
    IUsersAttributes {}

const User = database.define<IUsersInstance>(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
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

export { User };
