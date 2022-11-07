module.exports = (sequelize, dataTypes) => {
  let alias = "Provincias";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    provincia: {
      type: dataTypes.STRING(45),
    },
  };
  let config = {
    tableName: "Provincia",
    timestamps: false,
  };
  const Provincia = sequelize.define(alias, cols, config);
  Provincia.associate = function (models) {
    Provincia.hasMany(models.Direcciones, {
      as: "provincias",
      foreignKey: "id_provincia",
    });
  };
  return Provincia;
};
