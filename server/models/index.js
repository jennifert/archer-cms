import { Sequelize } from 'sequelize';
import UserModel from './user.js';
import ContentTypeModel from './content_type.js';
import TagModel from './tag.js';
import CategoryModel from './category.js';
import PageModel from './page.js';
import HeaderImageModel from './image_header.js';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite'
});

const models = {
  User: UserModel(sequelize),
  ContentType: ContentTypeModel(sequelize),
  Tag: TagModel(sequelize),
  Category: CategoryModel(sequelize),
  Page: PageModel(sequelize),
  HeaderImage: HeaderImageModel(sequelize)
};

// Relationships
models.Tag.belongsTo(models.User);
models.Category.belongsTo(models.User);

// Many-to-many: Page <-> Tag
models.Page.belongsToMany(models.Tag, { through: 'PageTags' });
models.Tag.belongsToMany(models.Page, { through: 'PageTags' });

// Ensure associations are registered
Object.values(models).forEach(model => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

// Sequelize instance
models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
