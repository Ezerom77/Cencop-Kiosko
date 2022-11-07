module.exports = (sequelize, dataTypes) => {
  let alias = "Colores";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: {
      type: dataTypes.STRING(45),
    },
  };
  let config = {
    tableName: "Color",
    timestamps: false,
  };
  const Color = sequelize.define(alias, cols, config);
  Color.associate = function (models) {
    Color.hasMany(models.Products, {
      as: "colores",
      foreignKey: "id_color",
    });
  };
  return Color;
};
