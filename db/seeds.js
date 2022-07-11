const mongoose = require('./connection');

const Question = require('../models/Question');
const Quiz = require('../models/Quiz');

const questionseeds = require('./seeds.json');

Show.deleteMany({})
	.then(() => Show.insertMany(questionseeds))
	.then(console.log)
	.catch(console.error)
	.finally(() => {
		process.exit();
	});
