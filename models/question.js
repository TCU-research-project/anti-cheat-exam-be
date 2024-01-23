const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  options: {
    type: Map,
    required: true,
  },
}, {
  collection: "Question"
});

const Question = mongoose.model("Question", QuestionSchema);

module.exports = { QuestionSchema, Question };
