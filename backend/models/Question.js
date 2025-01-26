const mongoose = require('mongoose');

const BlockSchema = new mongoose.Schema({
  text: String,
  showInOption: Boolean,
  isAnswer: Boolean
}, { _id: false });

const OptionSchema = new mongoose.Schema({
  text: String,
  isCorrectAnswer: Boolean
}, { _id: false });

const QuestionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  solution: String, // Only applicable for anagram-type questions
  anagramType: String, // 'WORD' or 'SENTENCE' for anagram questions
  blocks: [BlockSchema], //  for anagram-type questions
  options: [OptionSchema], //  for MCQ-type questions
  siblingId: mongoose.Schema.Types.ObjectId // Reference to a related question
});

module.exports = mongoose.model('Question', QuestionSchema);
