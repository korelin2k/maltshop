import * as Sequelize from "sequelize";
import dbOptions from "../config/config";
import { initCustomer } from "./repository/customer";
import { initInventory } from "./repository/inventory";

const env = process.env.NODE_ENV || "development";
console.log(dbOptions[env]);

let sequelize: Sequelize.Sequelize = new Sequelize(dbOptions[env]);

const db = {
  Customer: initCustomer(sequelize),
  Inventory: initInventory(sequelize),
  Sequelize,
  sequelize,
};

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;
