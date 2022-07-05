const mongoose = require('../db/connection');
const questionSchema = require('./Question');

const quizSchema = new mongoose.Schema(
	{
		title: String,
		numberOfQuestions: Number,
		category: String,
		questions: [questionSchema],
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
