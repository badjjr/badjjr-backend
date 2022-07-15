const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();
const { createUserToken } = require('../middleware/auth');

//Create User/Sign Up
//Post /api/createUser
router.post('/createUser', async (req, res, next) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 5);
		const newUser = await User.create({
			password: hashedPassword,
			username: req.body.username,
		})
			.then((user) => res.status(201).json(user))
			.catch(next);
		return res.status(201).json(newUser);
	} catch (error) {
		return next(error);
	}
});

//Show User/Sign In
//Post /api/showUser
router.post('/showUser', async (req, res, next) => {
	try {
		const signIn = await User.findOne({ username: req.body.username })
			.then((user) => createUserToken(req, user))
			.then((token) => res.json({ token }))
			.catch(next);
	} catch (error) {
		return next(error);
	}
});

module.exports = router