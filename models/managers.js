/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('managers', {
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  salt: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  locked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  contact: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  loginattempts: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '0'
  },
  firstname: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  lastname: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  locationid: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'locations',
      key: 'id'
    }
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
  }, {
    tableName: 'managers'
  });
};
