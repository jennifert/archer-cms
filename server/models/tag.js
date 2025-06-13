import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

    Tag.associate = models => {
        Tag.belongsTo(models.User); // links Tag.userId to User
    };

  // Associations will be defined after all models are loaded
  return Tag;
};
