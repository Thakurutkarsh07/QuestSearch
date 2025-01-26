const Question = require('../models/Question');

async function searchQuestions(call, callback) {
  try {
    const query = call.request.query;

    // Find questions where title contains the search query
    const results = await Question.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { solution: { $regex: query, $options: 'i' } },
        { "blocks.text": { $regex: query, $options: 'i' } },
        { "options.text": { $regex: query, $options: 'i' } }
      ]
    });


    if (results.length === 0) {
      return callback(null, { message: 'No questions found matching the query.' });
    }

    // Map the results 
    callback(null, { results: results.map(q => ({
      id: q._id.toString(),
      type: q.type,
      title: q.title,
      solution: q.solution,
      blocks: q.blocks,
      options: q.options
    })) });
  } catch (error) {
    console.error("❌ Error in search:", error);
    callback(error, null);
  }
}

async function uploadData(call, callback) {
  try {
    const questions = call.request.data;

    let uploadedCount = 0;
    let skippedCount = 0;

    // Iterate through each question
    for (const question of questions) {
      await Question.create(question);
      uploadedCount++;
      console.log(`✅ Uploaded: ${question.title}`);
    }

    callback(null, { message: `${uploadedCount} questions uploaded successfully. ${skippedCount} were skipped.` });
  } catch (error) {
    console.error("❌ Error in data upload:", error);
    callback(error, null);
  }
}

module.exports = { searchQuestions, uploadData };
