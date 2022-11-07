module.exports = (sequelize, dataTypes) => {
  let alias = "Products";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codProducto: {
      type: dataTypes.STRING(100),
    },
    nombre: {
      type: dataTypes.STRING(100),
    },
    id_color: {
      type: dataTypes.INTEGER,
    },
    id_size: {
      type: dataTypes.INTEGER,
    },
    descripcion: {
      type: dataTypes.STRING(500),
    },
    paginas: {
      type: dataTypes.INTEGER,
    },
    indiceCobertura: {
      type: dataTypes.DECIMAL(10, 2), //ajuste este campo en la DB
    },
    fecha_creacion: {
      type: dataTypes.DATE,
    },
    ultima_edicion: {
      type: dataTypes.DATE,
    },
    fecha_baja: {
      type: dataTypes.DATE,
      allowNull: true,
    },
    imagen: {
      type: dataTypes.STRING(150),
    }
  };
  let config = {
    tableName: "Producto",
    timestamps: false,
    onDelete: 'CASCADE'
  };
  const Product = sequelize.define(alias, cols, config);
  Product.associate = function (models) {
    Product.belongsTo(models.Colores, {
      as: "color",
      foreignKey: "id_color"
    });
    Product.belongsTo(models.Sizes, {
      as: "size",
      foreignKey: "id_size"
    });
    // Product.belongsTo(models.Transacciones, {
    //   as: "transaccion",
    //   foreignKey: "id_transaccion"
    // });
    Product.belongsToMany(models.Categorias, {
      as: "categorias",
      through: "Producto_Categoria",
      foreignKey: "id_Producto",
      otherKey: "id_Categoria",
      timestamps: false
    });
    Product.belongsToMany(models.Transacciones, {
      as: "Transacciones",
      through: "Producto_Transaccion",
      foreignKey: "id_Producto",
      otherKey: "id_transaccion",
      timestamps: false
    });
    Product.hasMany(models.imagenProducto, {
      as: "imagenes",
      foreignKey: "id_Producto",
      timestamps: false
    });
  };
  return Product;
};
