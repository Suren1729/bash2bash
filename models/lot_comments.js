const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class LotComment extends Model {
    static associate(models) {
      LotComment.belongsTo(models.User, {
        foreignKey: "commenter_id",
        as: "commenter",
      });
      LotComment.belongsTo(models.Lot, { foreignKey: "lot_id", as: "lot" });
    }
  }

  LotComment.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      commenter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lot_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "LotComment",
      underscored: true,
    }
  );

  return LotComment;
};
