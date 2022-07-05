const mongoose = require('../db/connection');

const questionSchema = new mongoose.Schema(

	{
		type: {
			type: String,
			required: true,
		},
		question: {
			type: String,
			required: true,
		},
		answerChoices: [
			{
				type: String,
				required: true,
			},
		],
		correctAnswer: {
			type: String,
			required: true,
		},
		incorrectAnswers: [
			{
				type: String,
				required: true,
			},
		],
	},
	{ timestamps: true }
);

module.exports = questionSchema;
