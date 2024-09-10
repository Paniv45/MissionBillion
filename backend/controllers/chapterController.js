const Chapter = require('../models/Chapter');

exports.getChapters = async (req, res) => {
  const { class: className } = req.query;
  try {
    const chapters = await Chapter.find({ class: className });
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chapters' });
  }
};
