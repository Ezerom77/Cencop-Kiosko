module.exports = (sequelize, dataTypes) => {
  let alias = "Categorias";
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
    tableName: "Categoria",
    timestamps: false,
  };
  const Categoria = sequelize.define(alias, cols, config);

  Categoria.associate = function (models) {
    Categoria.belongsToMany(models.Products, {
      as: "productos",
      through: "Producto_Categoria",
      foreignKey: "id_Categoria",
      otherKey: "id_Producto",
      timestamps: false
    });
  };
  return Categoria;
};
