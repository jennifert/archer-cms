import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const HeaderImage = sequelize.define('HeaderImage', {
    filename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dateSaved: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

    HeaderImage.associate = models => {
        HeaderImage.belongsTo(models.User); // links HeaderImage.userId to User
    };

  return HeaderImage;
};
