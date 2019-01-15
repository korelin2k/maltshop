import * as Sequelize from "sequelize";
import { InventoryModel } from "./inventory";

interface ICustomerAttributes {
    id?: number;
    name: string;
    image: string;
    createdAt?: string;
    updatedAt?: string;
    inventory?: InventoryModel;
}

export type CustomerInstance = Sequelize.Instance<ICustomerAttributes> & ICustomerAttributes;
export type CustomerModel = Sequelize.Model<CustomerInstance, ICustomerAttributes>;

export function initCustomer(sequelize: Sequelize.Sequelize): CustomerModel {
    const attributes: SequelizeAttributes<ICustomerAttributes> = {
        id: {
            allowNull: false,
            defaultValue: Sequelize.INTEGER,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        image: {
            allowNull: false,
            type: Sequelize.STRING(1280),
            validate: {
                len: [5, 1280],
            },
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING,
            validate: {
                len: [2, 100],
            },
        },
    };

    const customer = sequelize.define<CustomerInstance, ICustomerAttributes>("Customer", attributes);

    customer.associate = ({ Inventory }: { Inventory: InventoryModel }) => {
        customer.belongsTo(Inventory);
    };

    return customer;
}
