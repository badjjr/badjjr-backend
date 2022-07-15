const mongoose = require('../db/connection');
const questionSchema = require('./Question');

const quizSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: false,
		},
		numberOfQuestions: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			required: true,
			unique: false,
		},
		questions: [questionSchema],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Quiz', quizSchema);
