/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('donations', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    locationid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'locations',
        key: 'id'
      }
    },
    tstamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    shortdescription: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    value: {
      type: "MONEY",
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM("Clothing","Hat","Kitchen","Electronics","Household","Other"),
      allowNull: false
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: "BYTEA",
      allowNull: true
    },
    addedbyadmin: {
      type: DataTypes.TEXT,
      allowNull: true,
      references: {
        model: 'admins',
        key: 'username'
      }
    },
    addedbymanager: {
      type: DataTypes.TEXT,
      allowNull: true,
      references: {
        model: 'managers',
        key: 'username'
      }
    },
    addedbyemployee: {
      type: DataTypes.TEXT,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'username'
      }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    tableName: 'donations'
  });
};
