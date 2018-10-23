/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('locations', {
  name: {
      type: DataTypes.TEXT,
      allowNull: false
  },
  type: {
    type: DataTypes.ENUM("Drop Off","Store","Warehouse"),
    allowNull: false
  },
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  longitude: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  phone: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
  }, {
    tableName: 'locations'
  });
};
