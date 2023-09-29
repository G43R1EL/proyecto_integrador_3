const { DataTypes } = require('sequelize')
const sequelize = require('../connection/connection')

const ActricesActores = sequelize.define('ActricesActores', {
  idActor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'actricesyactores',
  timestamps: false
})

module.exports = ActricesActores