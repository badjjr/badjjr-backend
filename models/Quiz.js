const mongoose = require('../db/connection');

const quizSchema = new mongoose.Schema(
	{
		title: String,
		numberOfQuestions: Number,
		category: String,
		questions: [questionSchema],
		creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Quiz', quizSchema);
