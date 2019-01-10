import * as Sequelize from "sequelize";

interface IInventoryAttributes {
  id?: number;
  name: string;
  image: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

type InventoryInstance = Sequelize.Instance<IInventoryAttributes> & IInventoryAttributes;
type InventoryModel = Sequelize.Model<InventoryInstance, IInventoryAttributes>;

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
  return inventory;
}

  // Shop.associate = function (models) {
  //   // We're saying that a Post should belong to an Author
  //   // A Post can't be created without an Author due to the foreign key constraint
  //   Shop.belongsTo(models.Player, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };
