import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class Account extends Model {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public phone!: string;
  public password!: string;
  public birthday!: string;
  public created_at!: Date;
  public last_modified!: Date;
}

Account.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: new DataTypes.STRING(100),
    allowNull: false,
  },
  last_name: {
    type: new DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: new DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  phone: {
    type: new DataTypes.STRING(16),
    allowNull: false,
  },
  password: {
    type: new DataTypes.STRING(70),
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  last_modified: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  tableName: 'accounts',
  timestamps: false,
});

export default Account;
