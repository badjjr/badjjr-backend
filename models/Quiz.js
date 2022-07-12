const mongoose = require('../db/connection');
const questionSchema = require('./Question');

const quizSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: false
		},
		numberOfQuestions: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			required: true,
			unique: false
		},
		questions: [questionSchema],
	},
	{ timestamps: true }
);

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
