const express = require('express');
const router = express.Router();

router.get('/chapters', (req, res) => {
  const classSelected = req.query.class; // Get class from query params

  // Example data for chapters
  const allChapters = {
    Physics: {
      11: ['Kinematics', 'Laws of Motion'],
      12: ['Electromagnetism', 'Optics'],
    },
    Chemistry: {
      11: ['Atomic Structure', 'Chemical Bonding'],
      12: ['Electrochemistry', 'Organic Reactions'],
    },
    Maths: {
      11: ['Trigonometry', 'Algebra'],
      12: ['Calculus', 'Vectors'],
    },
  };

  // If class is specified, return filtered chapters for that class
  if (classSelected) {
    const filteredChapters = {
      Physics: allChapters.Physics[classSelected] || [],
      Chemistry: allChapters.Chemistry[classSelected] || [],
      Maths: allChapters.Maths[classSelected] || [],
    };
    return res.json(filteredChapters);
  }

  // Return all chapters if no class is selected
  const chaptersForAllClasses = {
    Physics: [...allChapters.Physics['11'], ...allChapters.Physics['12']],
    Chemistry: [...allChapters.Chemistry['11'], ...allChapters.Chemistry['12']],
    Maths: [...allChapters.Maths['11'], ...allChapters.Maths['12']],
  };

  return res.json(chaptersForAllClasses);
});

module.exports = router;
