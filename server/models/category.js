import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Category = sequelize.define('Category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    });

    Category.associate = models => {
        Category.belongsTo(models.User);
    };

    return Category;
};
