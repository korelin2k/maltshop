import * as Sequelize from "sequelize";

interface ICustomerAttributes {
  id?: number;
  name: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

type CustomerInstance = Sequelize.Instance<ICustomerAttributes> & ICustomerAttributes;
type CustomerModel = Sequelize.Model<CustomerInstance, ICustomerAttributes>;

export function initCustomer(sequelize: Sequelize.Sequelize): CustomerModel {
  const attributes: SequelizeAttributes<ICustomerAttributes> = {
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
  return customer;
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
