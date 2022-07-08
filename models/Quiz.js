const mongoose = require('../db/connection');

const quizSchema = new mongoose.Schema({});

module.exports = mongoose.model('User', quizSchema);
