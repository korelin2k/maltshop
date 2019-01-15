import * as Sequelize from "sequelize";
import { CustomerModel } from "./customer";

interface IInventoryAttributes {
    id?: number;
    name: string;
    image: string;
    description: string;
    devoured: boolean;
    createdAt?: string;
    updatedAt?: string;
    customer?: CustomerModel;
}

export type InventoryInstance = Sequelize.Instance<IInventoryAttributes> & IInventoryAttributes;
export type InventoryModel = Sequelize.Model<InventoryInstance, IInventoryAttributes>;

export function initInventory(sequelize: Sequelize.Sequelize): InventoryModel {
    const attributes: SequelizeAttributes<IInventoryAttributes> = {
        createdAt: {
            defaultValue: sequelize.literal("NOW()"),
            type: Sequelize.DATE,
        },
        description: {
            allowNull: false,
            type: Sequelize.TEXT,
        },
        devoured: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
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
                len: [4, 50],
            },
        },
        updatedAt: {
            defaultValue: sequelize.literal("NOW()"),
            type: Sequelize.DATE,
        },
    };
    const inventory = sequelize.define<InventoryInstance, IInventoryAttributes>("Inventory", attributes);

    inventory.associate = ({ Customer }: { Customer: CustomerModel }) => {
        inventory.hasMany(Customer);
    };

    return inventory;
}
