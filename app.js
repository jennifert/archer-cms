var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
const requireLogin = require('./require_login');

const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

mongoose.connect(process.env.MONGODB_SERVER, {
    useMongoClient: true,
});
// mongoose.connect(process.env.MONGODB_SERVER);
//TODO: Spilt into smaller files?
//data schemas
const User = require('./server/users.js');
// const Role = require('./server/roles.js');
const ContentType = require('./server/content_types.js');
const Page = require('./server/pages_posts.js');
const Categorie = require('./server/categories.js');
const Tag = require('./server/tags.js');
const HeaderImage = require('./server/headers.js');

//start auth
//TODO: Move logins to e required. One require for non-signed in users, the other for signed in users.
passport.use(User.createStrategy());
app.use(bodyParser.json());
app.use(session({ secret: process.env.COOKIE_SERCRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//start rest of stuff.
app.use(express.static('public'));
app.use(express.static('assets'));

app.get('/api/page', requireLogin, (req, res) => {
  Page.find().populate('user type category tags').exec().then((pages) => {
    res.status(200).send(pages);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post('/api/page', requireLogin, (req, res, next) => {
  const pageModel = new Page();
  const page = Object.assign(pageModel, req.body);
  page.save((err, doc) => {
      if (err) {
          res
              .status(422)
              .send(err);
              console.log(err);
      } else {
        res
            .status(200)
            .send(doc);
      }
  });
});

app.get('/api/page/:id', requireLogin, (req, res, next) => {
  const pageId = req.params.id;
  Page.findOne({
      _id:pageId
  }).populate('user type category tags.tag').exec().then((doc) => {
      res.status(200).send(doc);
  });
});

app.put('/api/page/:id', requireLogin, (req, res, next) => {
  const model = req.body;
  const page = Page.findById(req.params.id, (err, doc) => {
      if (err) {
          res
              .status(500)
              .send(err);
      } else {
          delete req.body._id;
          const updatedPage = Object.assign(doc, model);
          updatedPage.save((err, doc) => {
              if (err) {
                  res
                      .status(500)
                      .send(err);
              } else {
                  res
                      .status(200)
                      .send(doc);
              }
          });
      }
  });
});

app.delete('/api/page/:id', requireLogin, (req, res) => {
  const pageId = req.params.id;
  Page.remove({_id: pageId})
    .then((doc)=>{
      res.status(200).send(doc);
    }).catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/api/type', requireLogin, (req, res, next) => {
  ContentType.find().then((contenttypes) => {
    res.status(200).send(contenttypes);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post('/api/type/', requireLogin, (req, res, next) => {
  const contentType = new ContentType();
  const cTypes = Object.assign(contentType, req.body);
  cTypes.save((err, doc) => {
      if (err) {
          res
              .status(422)
              .send(err);
              console.log(err);
      } else {
        res
            .status(200)
            .send(doc);
      }
  });
});

app.put('/api/type/:id', requireLogin, (req, res, next) => {
  const model = req.body;
  const content = ContentType.findById(req.params.id, (err, doc) => {
      if (err) {
          res
              .status(500)
              .send(err);
      } else {
          delete req.body._id;
          const updatedType = Object.assign(doc, model);
          updatedType.save((err, doc) => {
              if (err) {
                  res
                      .status(500)
                      .send(err);
              } else {
                  res
                      .status(200)
                      .send(doc);
              }
          });
      }
  });
});

app.get('/api/categories', requireLogin, (req, res, next) => {
  Categorie.find().populate('user').exec().then((categories) => {
    res.status(200).send(categories);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post('/api/categories/', requireLogin, (req, res, next) => {
  const categoryModel = new Categorie();
  const category = Object.assign(categoryModel, req.body);
  category.save((err, doc) => {
      if (err) {
          res
              .status(422)
              .send(err);
              console.log(err);
      } else {
        res
            .status(200)
            .send(doc);
      }
  });
});

app.put('/api/categories/:id', requireLogin, (req, res, next) => {
  const model = req.body;
  const category = Categorie.findById(req.params.id, (err, doc) => {
      if (err) {
          res
              .status(500)
              .send(err);
      } else {
          delete req.body._id;
          const updatedCategory = Object.assign(doc, model);
          updatedCategory.save((err, doc) => {
              if (err) {
                  res
                      .status(500)
                      .send(err);
              } else {
                  res
                      .status(200)
                      .send(doc);
              }
          });
      }
  });
});

app.get('/api/categories/:id', requireLogin, (req, res, next) => {
  const categoryId = req.params.id;
  Categorie.findOne({
      _id:categoryId
  }).populate('user').exec().then((doc) => {
      res.status(200).send(doc);
  });
});

app.delete('/api/categories/:id', requireLogin, (req, res) => {
  const categoryId = req.params.id;
  Categorie.remove({_id: categoryId})
    .then((doc)=>{
      res.status(200).send(doc);
    }).catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/api/tags/', requireLogin, (req, res, next) => {
  Tag.find().populate('user').exec().then((tags) => {
    res.status(200).send(tags);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post('/api/tags/', requireLogin, (req, res, next) => {
  const tagModel = new Tag();
  const tag = Object.assign(tagModel, req.body);
  tag.save((err, doc) => {
      if (err) {
          res
              .status(500)
              .send(err);
      } else {
        res
            .status(200)
            .send(doc);
      }
  });
});

app.put('/api/tags/:id', requireLogin, (req, res, next) => {
  const model = req.body;
  const tag = Tag.findById(req.params.id, (err, doc) => {
      if (err) {
          res
              .status(500)
              .send(err);
      } else {
          delete req.body._id;
          const updatedTag = Object.assign(doc, model);
          updatedTag.save((err, doc) => {
              if (err) {
                  res
                      .status(500)
                      .send(err);
              } else {
                  res
                      .status(200)
                      .send(doc);
              }
          });
      }
  });
});

app.get('/api/tags/:id', requireLogin, (req, res, next) => {
  const tagId = req.params.id;
  Tag.findOne({
      _id:tagId
  }).populate('user').exec().then((doc) => {
      res.status(200).send(doc);
  });
});

app.delete('/api/tags/:id', requireLogin, (req, res) => {
  const tagId = req.params.id;
  Tag.remove({_id: tagId})
    .then((doc)=>{
      res.status(200).send(doc);
    }).catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/api/settings/header/', requireLogin, (req, res, next) => {
  HeaderImage.find().populate('user').exec().then((images) => {
    res.status(200).send(images);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post('/api/settings/header/', requireLogin, (req, res, next) => {
  const model = new HeaderImage();
  const image = Object.assign(model, req.body);
  image.save((err, doc) => {
      if (err) {
          res
              .status(500)
              .send(err);
      } else {
        res
            .status(200)
            .send(doc);
      }
  });
});

app.delete('/api/settings/header/:id', requireLogin, (req, res) => {
  const imageId = req.params.id;
  HeaderImage.remove({_id: imageId})
    .then((doc)=>{
      res.status(200).send(doc);
    }).catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/api/settings/endpoints', requireLogin, (req, res) => {
const json = `[{
"_id": 1,
"route": "/api/login",
"type": "GET, POST",
"purpose": "All authentication work here."
},
{
"_id": 2,
"route": "/api/page",
"type": "GET, POST",
"purpose": "gets/edits a list of all posts and pages"
},
{
"_id": 3,
"route": "/api/type",
"type": "GET",
"purpose": "Get and edit a list of all content types"
},
{
"_id": 4,
"route": "/api/categories",
"type": "GET, POST",
"purpose": "Get and edit a list of all categories"
},
{
"_id": 5,
"route": "/api/tags",
"type": "GET, POST",
"purpose": "Get and edit a list of all tags"
},
{
"_id": 6,
"route": "/api/settings/header",
"type": "GET, POST",
"purpose": "Gets and posts a list of all site header images"
},
{
"_id": 7,
"route": "/api/settings/endpoints",
"type": "GET",
"purpose": "Displays a list of end points"
}]`;
  res.status(200).send(json);
});

app.post('/api/signup', (req, res, next) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
  });

  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
});

app.get('/api/users', (req, res) => {
    User.find()
      .then((docs) => res.send(docs));
});

app.post('/api/login', passport.authenticate('local'), (req, res) => {
    res.send(req.user);
});

app.get('/api/me', (req, res) => {
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.status(401).json({ message: "Unauthorized."});
  }
});

app.get('/api/logout', (req, res) => {
  req.logout();
  res.json('User logged out.');
});

//typicall end file and open port
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname,'index.html'));
});
app.listen(process.env.PORT, function() {
  console.log(`App is now listening on port ${process.env.PORT}!`);
});
