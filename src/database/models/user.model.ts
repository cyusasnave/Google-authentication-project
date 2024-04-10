import { DataTypes, Model, UUIDV4 } from "sequelize";
import db from "../config/config";

export interface GoogleUserModelAttributes {
  id: string;
  googleId: string;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  role: string;
}


export class GoogleUserModel extends Model<GoogleUserModelAttributes> {}

GoogleUserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
      unique: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "User",
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "Users",
  }
);

