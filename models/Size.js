module.exports = (sequelize, dataTypes) => {
  let alias = "Sizes";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: {
      type: dataTypes.STRING(45),
    }
  };
  let config = {
    tableName: "Size",
    timestamps: false,
  };
  const Size = sequelize.define(alias, cols, config);

  Size.associate = function (models) {
    Size.hasMany(models.Products, {
      as: "size",
      foreignKey: "id_size",
    });
  };
  return Size;
};