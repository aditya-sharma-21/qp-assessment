import { Grocery, IGroceryInstance } from "../models/Grocery.js";

export const getAllGrocery = async (req, res, next) => {
  try {
    const grocery = await Grocery.findAll();
    return res.send(grocery);
  } catch (error) {
    return res.send({ message: error.message });
  }
};

export const getGrocery = async (req, res, next) => {
  try {
    const grocery = await Grocery.findByPk(req.params.id);
    return res.send(grocery);
  } catch (error) {
    return res.send({ message: error.message });
  }
};

export const addGrocery = async (req, res, next) => {
  try {
    const { name, description, price, quantity } = req.body;
    const grocery = await Grocery.create({
      name,
      description,
      price,
      quantity,
    });
    return res.send(grocery);
  } catch (error) {
    return res.send({ message: error.message });
  }
};

export const updateGrocery = async (req, res, next) => {
  try {
    const { name, description, price, quantity } = req.body;

    const grocery = await Grocery.update(
      {
        name,
        description,
        price,
        quantity,
      },
      { where: { id: req.params.id }, returning: true }
    );
    return res.send(grocery);
  } catch (error) {
    return res.send({ message: error.message });
  }
};

export const addInventeryItemsGrocery = async (req, res, next) => {
  try {
    const { quantity } = req.body;

    const grocery: IGroceryInstance = await Grocery.findByPk(req.params.id);

    grocery.quantity = grocery.quantity + quantity;
    grocery.save();

    return res.send(grocery);
  } catch (error) {
    return res.send({ message: error.message });
  }
};

export const deleteGrocery = async (req, res, next) => {
  try {
    await Grocery.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.send({ message: "Deleted Successfully" });
  } catch (error) {
    return res.send({ message: error.message });
  }
};
