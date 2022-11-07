module.exports = (sequelize, dataTypes) => {
  let alias = "imagenProducto";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreArchivo: {
      type: dataTypes.STRING(150),
    },
    id_Producto: {
      type: dataTypes.INTEGER,
    }
  };
  let config = {
    tableName: "imagenProducto",
    timestamps: false,
  };
  const imagenProducto = sequelize.define(alias, cols, config);
  return imagenProducto;
};