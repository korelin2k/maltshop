import * as Sequelize from "sequelize";
import { initCustomer } from "./repository/customer";
import { initInventory } from "./repository/inventory";

let sequelize: Sequelize.Sequelize;

if (process.env.NODE_ENV === "production") {
    sequelize = new Sequelize(process.env.JAWSDB_URL, {
        dialect: "mysql",
    });
} else {
    sequelize = new Sequelize({
        database: "maltshop",
        dialect: "mysql",
        host: "127.0.0.1",
        password: "password",
        port: 3306,
        username: "root",
    });
}

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
