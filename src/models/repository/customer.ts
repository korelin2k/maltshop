import * as Sequelize from "sequelize";
import { InventoryModel } from "./inventory";

interface ICustomerAttributes {
    id?: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    inventory?: InventoryModel;
}

export type CustomerInstance = Sequelize.Instance<ICustomerAttributes> & ICustomerAttributes;
export type CustomerModel = Sequelize.Model<CustomerInstance, ICustomerAttributes>;

export function initCustomer(sequelize: Sequelize.Sequelize): CustomerModel {
    const attributes: SequelizeAttributes<ICustomerAttributes> = {
        createdAt: {
            defaultValue: sequelize.literal("NOW()"),
            type: Sequelize.DATE,
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING,
            validate: {
                len: [2, 100],
            },
        },
        updatedAt: {
            defaultValue: sequelize.literal("NOW()"),
            type: Sequelize.DATE,
        },
    };

    const customer = sequelize.define<CustomerInstance, ICustomerAttributes>("Customer", attributes);

    customer.associate = ({ Inventory }: { Inventory: InventoryModel }) => {
        customer.belongsTo(Inventory);
    };

    return customer;
}
