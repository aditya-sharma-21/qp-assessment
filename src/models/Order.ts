import { DataTypes } from "sequelize";
import { database } from "../config/database.js";
import { Grocery } from "./Grocery.js";
import { User } from "./User.js";

const Order = database.define(
  "order",
  {
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

const OrderItem = database.define("order_item", {
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

Order.sync().then(() => {
  console.log("Order table created");
});

OrderItem.sync().then(() => {
  console.log("Order Item table created");
});

User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Grocery.hasMany(OrderItem, { foreignKey: "grocery_id" });
OrderItem.belongsTo(Grocery, { foreignKey: "grocery_id" });

export { Order, OrderItem };
