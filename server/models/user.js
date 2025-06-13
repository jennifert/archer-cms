import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

// Define model
export default (sequelize) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'author', 'viewer'),
      defaultValue: 'viewer'
    }
  });

  // Instance method for password comparison
  User.prototype.validatePassword = function (inputPassword) {
    return bcrypt.compare(inputPassword, this.password);
  };

  // Hook: hash password before saving
  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  return User;
};