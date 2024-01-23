const { DataTypes } = require('sequelize');

module.exports.UserModel = (sequelize) => {
  return sequelize.define(
    'users',
    {
        userid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        namalengkap: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
    }
  );
};
