import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ContentType = sequelize.define('ContentType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return ContentType;
};
