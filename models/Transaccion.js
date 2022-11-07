module.exports = (sequelize, dataTypes) => {
  let alias = "Transacciones";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_comprador: {
      type: dataTypes.INTEGER,
    },
    id_estado: {
      type: dataTypes.INTEGER,
    },
    id_direccion: {
      type: dataTypes.INTEGER,
    },
    fecha_compra: {
      type: dataTypes.DATE,
    },
    fecha_entrega: {
      type: dataTypes.DATE,
    },
    observaciones: {
      type: dataTypes.TEXT,
    },
    observacionesProd: {
      type: dataTypes.TEXT,
    },
  };
  let config = {
    tableName: "Transaccion",
    timestamps: false,
  };
  const Transaccion = sequelize.define(alias, cols, config);
  Transaccion.associate = function (models) {
    Transaccion.belongsToMany(models.Products, {
      as: "productos",
      through: "Producto_Transaccion",
      foreignKey: "id_transaccion",
      otherKey: "id_Producto",
      timestamps: false
    });
    Transaccion.belongsTo(models.Users, {
      as: "comprador",
      foreignKey: "id_comprador"
    });
    Transaccion.belongsTo(models.Estados, {
      as: "estado",
      foreignKey: "id_estado"
    });
    Transaccion.belongsTo(models.Direcciones, {
      as: "direccion",
      foreignKey: "id_direccion"
    });
  };
  return Transaccion;
};
