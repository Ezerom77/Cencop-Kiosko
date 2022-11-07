module.exports = (sequelize, dataTypes) => {
  let alias = "Estados";
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
    tableName: "Estados",
    timestamps: false,
  };
  const Estado = sequelize.define(alias, cols, config);
  Estado.associate = function (models) {
    Estado.hasMany(models.Transacciones, {
      as: "estado",
      foreignKey: "id_estado",
    });
  };
  return Estado;
};
