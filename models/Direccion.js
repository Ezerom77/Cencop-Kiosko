module.exports = (sequelize, dataTypes) => {
  let alias = "Direcciones";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    calle: {
      type: dataTypes.STRING(100),
    },
    nro: {
      type: dataTypes.INTEGER,
    },
    piso: {
      type: dataTypes.INTEGER,
    },
    of: {
      type: dataTypes.STRING(45),
    },
    id_ciudad: {
      type: dataTypes.INTEGER,
    },
    cp: {
      type: dataTypes.STRING(11),
    },
    id_provincia: {
      type: dataTypes.INTEGER,
    },
    id_pais: {
      type: dataTypes.INTEGER,
    },
  };
  let config = {
    tableName: "Direccion",
    timestamps: false,
  };
  const Direccion = sequelize.define(alias, cols, config);
  Direccion.associate = function (models) {
    Direccion.hasMany(models.Transacciones, {
      as: "direccion",
      foreignKey: "id_direccion",
    });
    Direccion.belongsTo(models.Ciudades, {
      as: "ciudades",
      foreignKey: "id_ciudad"
    });
    Direccion.belongsTo(models.Provincias, {
      as: "provincias",
      foreignKey: "id_provincia"
    });
    Direccion.belongsTo(models.Paises, {
      as: "paises",
      foreignKey: "id_pais",
    });
  };
  return Direccion;
};
