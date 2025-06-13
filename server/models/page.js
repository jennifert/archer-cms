import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Page = sequelize.define('Page', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateCreated: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dateEdited: {
            type: DataTypes.DATE,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    Page.associate = models => {
        Page.belongsTo(models.User);
        Page.belongsTo(models.Category);
        Page.belongsTo(models.ContentType);
    };


    return Page;
};