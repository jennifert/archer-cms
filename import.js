const mongoose = require('mongoose');
const User = require('./server/users.js');
// const Role = require('./server/roles.js');
const ContentType = require('./server/content_types.js');
const Page = require('./server/pages_posts.js');
const Categorie = require('./server/categories.js');
const Tag = require('./server/tags.js');
const HeaderImage = require('./server/headers.js');


mongoose.connect(process.env.MONGODB_SERVER, {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(err.message);
});

user1 = new User({
    name: 'Jane Doe',
    email: 'jdoe@example.com'
});
user2 = new User({
    name: 'Joe Smith',
    email: 'jsmith@example.com'
});

type1 = new ContentType({name: 'post'});
type2 = new ContentType({name: 'page'});

category1 = new Categorie({
  date: new Date(),
  name: "JavaScript",
  user: user1
});
category2 = new Categorie({
  date: new Date(),
  name: "PHP",
  user: user2
});

tag1 = new Tag({
  date: new Date(),
  name: "React",
  user: user1
});
tag2 = new Tag({
  date: new Date(),
  name: "Vanilla",
  user: user1
});
tag3 = new Tag({
  date: new Date(),
  name: "jQuery",
  user: user2
});

// page1 = new Page({
//   title: 'Test Post',
//   user: user1,
//   dateCreated: new Date(),
//   dateEdited: new Date(),//for testing only
//   content: ['Good Bye world'],
//   tags: [tag1._id],
//   category: category1._id,
//   type: type1._id,
// });
// page2 = new Page({
//   title: 'Test page',
//   user: user2,
//   dateCreated: new Date(),
//   dateEdited: new Date(),//for testing only
//   content: ['Hello world'],
//   tags: [tag3._id],
//   category: category2._id,
//   type: type2._id,
// });

image1 = new HeaderImage({
  dateSaved: new Date(),
  headerUrl: "https://jenntesolin.com/imgs/mayan_ruins.jpg",
  user: user1
});
image2 = new HeaderImage({
  dateSaved: new Date(),
  headerUrl: "https://jenntesolin.com/imgs/tall_ship.jpg",
  user: user1
});
image3 = new HeaderImage({
  dateSaved: new Date(),
  headerUrl: "https://jenntesolin.com/imgs/peace_arc.jpg",
  user: user2
});

User.deleteMany().then(() => {
  user1.save();
  user2.save();
});

HeaderImage.deleteMany().then(() => {
  image1.save();
  image2.save();
  image3.save();
});

ContentType.deleteMany().then(() => {
  type1.save();
  type2.save();
});

Categorie.deleteMany().then(() => {
  category1.save();
  category2.save();
});

Tag.deleteMany().then(() => {
  tag1.save();
  tag2.save();
  tag3.save();
});

Page.deleteMany().then(() => {
  // page1.save();
  // page2.save();
});

console.log('Import Complete.');
process.exit();
