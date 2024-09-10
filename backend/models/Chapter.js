const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  class: { type: String, required: true },
  subject: { type: String, required: true },
  chapters: [{ type: String }],
});

module.exports = mongoose.model('Chapter', chapterSchema);
