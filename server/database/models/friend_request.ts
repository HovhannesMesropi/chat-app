import { DataTypes, Sequelize } from 'sequelize';

export const FriendRequestModelGen = (sequelize: Sequelize) => sequelize.define('FriendRequests', {
    requestor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    requested: {
        type: DataTypes.INTEGER
    }
})
