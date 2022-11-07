module.exports = (sequelize, dataTypes) => {
  let alias = "Producto_Transaccion";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_Producto: {
      type: dataTypes.INTEGER,
    },
    cantidad: {
      type: dataTypes.INTEGER,
    },
    impresionesTotales: {
      type: dataTypes.INTEGER,
    },
    id_transaccion: {
      type: dataTypes.INTEGER,
    },
  };
  let config = {
    tableName: "Producto_Transaccion",
  };

  const Producto_Transaccion = sequelize.define(alias, cols, config);
  Producto_Transaccion.associate = function (models) {
    Producto_Transaccion.belongsTo(models.Products, {
      as: "producto",
      foreignKey: "id_Producto"
    });
    Producto_Transaccion.belongsTo(models.Transacciones, {
      as: "transacciones",
      foreignKey: "id_transaccion"
    });
  }
  return Producto_Transaccion;
};
