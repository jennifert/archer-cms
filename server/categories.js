const mongoose = require('mongoose');

const CategoriesSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

module.exports = mongoose.model('Categorie', CategoriesSchema);
