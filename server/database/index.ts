import { Sequelize } from "sequelize";
import { AccountModelGen, DialogModelGen,FriendRequestModelGen ,FriendshipModelGen} from './models';

export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    database: 'chat-app',
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    sync: {
        force: false
    }
});

export const AccountModel = AccountModelGen(sequelize);
export const DialogModel = DialogModelGen(sequelize);
export const FriendRequest = FriendRequestModelGen(sequelize);
export const FriendshipModel = FriendshipModelGen(sequelize);