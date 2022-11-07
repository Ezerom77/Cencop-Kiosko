module.exports = (sequelize, dataTypes) => {
  let alias = "Sectores";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sector: {
      type: dataTypes.STRING(50),
    },

  };
  let config = {
    tableName: "Sectores",
    timestamps: false,
  };
  const Sector = sequelize.define(alias, cols, config);
  Sector.associate = function (models) {
    Sector.hasMany(models.Users, {
      as: "sectores",
      foreignKey: "id_sector",
    });
  };
  return Sector;
};
