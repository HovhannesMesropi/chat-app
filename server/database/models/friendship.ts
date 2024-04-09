import { DataTypes, Sequelize } from 'sequelize';

export const FriendshipModelGen = (sequelize: Sequelize) => sequelize.define('Friendships', {
    requestedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    friend: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})
