module.exports = (sequelize, dataTypes) => {
  let alias = "Telefonos";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    area: {
      type: dataTypes.INTEGER,
    },
    numero: {
      type: dataTypes.INTEGER,
    },
  };
  let config = {
    tableName: "Telefono",
    timestamps: false,
  };
  const Telefono = sequelize.define(alias, cols, config);
  // Telefono.associate = function (models) {
  //   Telefono.hasMany(models.Users, {
  //     as: "telefono",
  //     foreignKey: "id_telefono",
  //   });
  // };
  return Telefono;
};
