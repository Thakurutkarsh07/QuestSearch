const express = require('express');
const Question = require('../models/Question');

const router = express.Router();

//  Get All Questions
router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find(); // Fetch all questions from MongoDB
    res.json(questions);
  } catch (error) {
    console.error("❌ Error fetching questions:", error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Upload Data 
router.post('/upload', async (req, res) => {
    try {
      const data = req.body.map(q => ({
        type: q.type,
        title: q.title,
        solution: q.solution || "",
        anagramType: q.anagramType || "",
        blocks: q.blocks ? q.blocks.map(block => ({
          text: block.text,
          showInOption: block.showInOption,
          isAnswer: block.isAnswer
        })) : [],
        options: q.options ? q.options.map(option => ({
          text: option.text,
          isCorrectAnswer: option.isCorrectAnswer
        })) : [],
        siblingId: q.siblingId || null
      }));
  
      // Directly insert all data without checking for duplicates
      const inserted = await Question.insertMany(data, { ordered: false });
  
      res.json({ message: `✅ Data uploaded successfully. ${inserted.length} questions added.` });
    } catch (error) {
      console.error("❌ Error in data upload:", error);
      res.status(500).json({ error: error.message || "An error occurred during data upload." });
    }
  });
  
  

// ✅ Search Endpoint
router.post('/search', async (req, res) => {
  try {
    const { query, type } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    let filter = {
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { solution: { $regex: query, $options: 'i' } },
        { "blocks.text": { $regex: query, $options: 'i' } },
        { "options.text": { $regex: query, $options: 'i' } },
      ]
    };

    if (type) {
      filter.type = type;
    }

    const results = await Question.find(filter);

    res.json({ results: results.map(q => ({
      id: q._id.toString(),
      type: q.type,
      title: q.title,
      solution: q.solution,
      blocks: q.blocks,
      options: q.options
    })) });
  } catch (error) {
    console.error("❌ Error in search:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
