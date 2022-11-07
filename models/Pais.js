module.exports = (sequelize, dataTypes) => {
  let alias = "Paises";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pais: {
      type: dataTypes.STRING(45),
    },
  };
  let config = {
    tableName: "Pais",
    timestamps: false,
  };
  const Pais = sequelize.define(alias, cols, config);
  Pais.associate = function (models) {
    Pais.hasMany(models.Direcciones, {
      as: "paises",
      foreignKey: "id_pais",
    });
  };
  return Pais;
};
