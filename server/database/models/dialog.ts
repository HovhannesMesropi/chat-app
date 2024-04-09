import { DataTypes, Sequelize } from 'sequelize';

export const DialogModelGen = (sequelize: Sequelize) => sequelize.define('Dialogs', {
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    to: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})
