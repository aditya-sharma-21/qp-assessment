import { DataTypes, Model } from "sequelize";
import { database } from "../config/database.js";
import { Grocery } from "./Grocery.js";
import { User } from "./User.js";

export interface IOrdersAttributes {
  id: number;
  user_order_id: string;
  user_id: number;
  total_amount: number;
}

export interface IOrderItemsAttributes {
  id: number;
  order_id: number;
  grocery_id: number;
  quantity: number;
}

export interface IOrdersInstance
  extends Model<IOrdersAttributes>,
    IOrdersAttributes {}

export interface IOrderItemsInstance
  extends Model<IOrderItemsAttributes>,
    IOrderItemsAttributes {}

const Order = database.define<IOrdersInstance>(
  "order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_order_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "users",
        },
        key: "id",
      },
      allowNull: false,
      onUpdate: "cascade",
      onDelete: "cascade",
    },
    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

const OrderItem = database.define<IOrderItemsInstance>("order_item", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  order_id: {
    type: DataTypes.INTEGER,
    references: {
      model: {
        tableName: "orders",
      },
      key: "id",
    },
    allowNull: false,
    onUpdate: "cascade",
    onDelete: "cascade",
  },
  grocery_id: {
    type: DataTypes.INTEGER,
    references: {
      model: {
        tableName: "Grocery",
      },
      key: "id",
    },
    allowNull: false,
    onUpdate: "cascade",
    onDelete: "cascade",
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Grocery.hasMany(OrderItem, { foreignKey: "grocery_id" });
OrderItem.belongsTo(Grocery, { foreignKey: "grocery_id" });

export { Order, OrderItem };
