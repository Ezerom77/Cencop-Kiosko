module.exports = (sequelize, dataTypes) => {
  let alias = "Ciudades";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ciudad: {
      type: dataTypes.STRING(100),
    },
  };
  let config = {
    tableName: "Ciudad",
    timestamps: false,
  };
  const Ciudad = sequelize.define(alias, cols, config);
  Ciudad.associate = function (models) {
    Ciudad.hasMany(models.Direcciones, {
      as: "ciudades",
      foreignKey: "id_ciudad",
    });
  };
  return Ciudad;
};
