const mongoose = require('../db/connection');

const questionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    body: {
      
    }
  }
);

module.exports = questionSchema;