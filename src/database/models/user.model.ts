import { DataTypes, Model, UUIDV4 } from 'sequelize';
import db from '../config/config';

interface UserModelAttributes {
    id: string,
    image: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    isVerified: boolean
}


export class UserModel extends Model<UserModelAttributes> {}

UserModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    confirmPassword: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    sequelize: db,
    tableName: "users"
})