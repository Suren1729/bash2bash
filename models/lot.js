const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Lot extends Model {
    static associate(models) {
      Lot.belongsTo(models.User, { foreignKey: "owner_id", as: "owner" });
      Lot.hasMany(models.Offer, { foreignKey: "lot_id", as: "offers" });
    }
  }
  Lot.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_accepted: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Lot",
      underscored: true,
    }
  );
  return Lot;
};
