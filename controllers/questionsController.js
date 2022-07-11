const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// INDEX
// GET /api/Questions
router.get('/', (req, res, next) => {
	Question.find()
		.then((Questions) => res.json(Questions))
		.catch(next);
});

// SHOW
// GET /api/Questions/:id
router.get('/:id', async (req, res, next) => {
	try {
		const Question = await Question.findById(req.params.id);
		res.json(Question);
	} catch (err) {
		next(err);
	}
});

// CREATE
// POST /api/Questions

router.post('/', async (req, res, next) => {
	try {
		const newQuestion = await Question.create(req.body);
		if (newQuestion) {
			const questions = await Question.find({});
			return res.status(201).json(questions);
		} else {
			return res.sendStatus(400);
		}
	} catch {
		return res.sendStatus(400);
	}
});

// UPDATE
// PUT /api/Questionzes/:id
router.put('/:id', async (req, res, next) => {
	try {
		const updateQuestion = await Question.findByIdAndUpdate(
			req.params.id,
			req.body
		);
		Question.find({}).then((Questions) => {
			return res.json(Questions);
		});
	} catch (err) {
		next(err);
	}
});

// DESTROY
// DELETE /api/Questionzes/:id
router.delete('/:id', async (req, res, next) => {
	try {
		const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
		Question.find({}).then((Questions) => {
			return res.json(Questions);
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;
