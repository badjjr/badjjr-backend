const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Quiz = require('../models/Quiz');

// CREATE: Add new question
// POST /api/questions
router.post('/', async (req, res) => {
	try {
		// Get body of new question
		const newQuestions = req.body;
		// Get id of quiz to add question to
		const quizId = newQuestions[0].quizId;
		const findQuiz = await Quiz.findById(quizId)
			.then((quiz) => {
				// Push the question to the quiz
				newQuestions.forEach((question) => {
					quiz.questions.push(question);
				});
				// Update quiz
				return quiz.save();
			})
			// Return updated quiz
			.then((updatedQuiz) => res.status(201).json(updatedQuiz));
	} catch (err) {
		console.log('Something went wrong...', err);
		return res.sendStatus(400);
	}
});

// UPDATE: Update question by id
// PATCH /api/questions/:id
router.patch('/:id', async (req, res) => {
	try {
		// Get body of updated question
		const updatedQuestion = req.body;
		// Get id of question to be updated
		const questionId = req.params.id;
		// Get id of quiz that holds question to be updated
		const quizId = req.body.quizId;
		// Find quiz using quiz id
		const findQuiz = await Quiz.findById(quizId)
			// Find question to be updated
			.then((quiz) => {
				const questionToUpdate = quiz.questions.id(questionId);
				// Update question
				questionToUpdate.set(updatedQuestion);
				return quiz.save();
			})
			// Return updated quiz
			.then((updatedQuiz) => res.status(201).json(updatedQuiz));
	} catch (err) {
		console.log('Something went wrong...', err);
		return res.sendStatus(400);
	}
});

// DELETE: Remove question by id
// DELETE /api/questions/:id
router.delete('/:id', async (req, res, next) => {
	try {
		// Get id of question to be deleted
		const questionId = req.params.id;
		// Find quiz that contains the question id to be deleted
		const deletedQuestion = await Quiz.findOne({ 'questions._id': questionId })
			.then((quiz) => {
				// Delete the question
				quiz.questions.id(questionId).remove();
				// Save the quiz
				return quiz.save();
			})
			// Return updated quiz
			.then((updatedQuiz) => res.status(200).json(updatedQuiz));
	} catch (err) {
		console.log('Something went wrong...', err);
		return res.sendStatus(400);
	}
});

module.exports = router;
