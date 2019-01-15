import * as Sequelize from "sequelize";
import { CustomerModel } from "./customer";

interface IInventoryAttributes {
    id?: number;
    name: string;
    image: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
    customer?: CustomerModel;
}

type InventoryInstance = Sequelize.Instance<IInventoryAttributes> & IInventoryAttributes;
export type InventoryModel = Sequelize.Model<InventoryInstance, IInventoryAttributes>;

export function initInventory(sequelize: Sequelize.Sequelize): InventoryModel {
    const attributes: SequelizeAttributes<IInventoryAttributes> = {
        description: {
            allowNull: false,
            type: Sequelize.TEXT,
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
    };
    const inventory = sequelize.define<InventoryInstance, IInventoryAttributes>("Inventory", attributes);

    inventory.associate = ({ Customer }: { Customer: CustomerModel }) => {
        inventory.hasMany(Customer);
    };

    return inventory;
}
