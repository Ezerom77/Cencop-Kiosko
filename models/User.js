module.exports = (sequelize, dataTypes) => {
  let alias = "Users";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: dataTypes.STRING(45),
    },
    apellido: {
      type: dataTypes.STRING(100),
    },
    email: {
      type: dataTypes.STRING(45),
    },
    id_sector: {
      type: dataTypes.INTEGER,
    },
    password: {
      type: dataTypes.STRING(100),
    },
    admin: {
      type: dataTypes.TINYINT,
    },
    id_telefono: {
      type: dataTypes.INTEGER,
    },
    id_direccion: {
      type: dataTypes.INTEGER,
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
  };
  let config = {
    tableName: "Usuario",
    timestamps: false,
  };
  const User = sequelize.define(alias, cols, config);
  User.associate = function (models) {
    // User.belongsTo(models.Telefonos, {
    //   as: "telefono",
    //   foreignKey: "id_telefono"
    // });
    User.hasMany(models.Transacciones, {
      as: "comprador",
      foreignKey: "id_comprador",
    });
    User.belongsTo(models.Sectores, {
      as: "sectores",
      foreignKey: "id_sector",
    });
  };

  return User;
};
