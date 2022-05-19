const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = AnswerSchema;
