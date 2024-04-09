import { DataTypes, Sequelize } from 'sequelize';

export const AccountModelGen = (sequelize: Sequelize) => sequelize.define('accounts', {
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    title: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false
    }
})
