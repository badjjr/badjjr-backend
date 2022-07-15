const mongoose = require('mongoose')

class OwnershipError extends Error {
	constructor() {
		super();
		this.name = 'OwnershipError';
		this.statusCode = 401;
		this.message =
			'The provided token does not match the owner of this document';
	}
}

class BadCredentialsError extends Error {
	constructor() {
		super();
		this.name = 'BadCredentialsError';
		this.statusCode = 422;
		this.message = 'The provided username or password is incorrect';
	}
}

const handleValidateOwnership = (req, document) => {
	const ownerId = document.owner._id || document.owner;
	// Check if the current user is also the owner of the document
	if (!req.user._id.equals(ownerId)) {
		throw new OwnershipError();
	} else {
		return document;
	}
};

const handleValidateId = (req, res, next) => {
	const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
	if (!isValidId) {
		throw new InvalidIdError();
	} else {
		next();
	}
};

const handleValidationErrors = (err, req, res, next) => {
	if (err.name.match(/Valid/) || err.name === 'MongoError') {
		throw new BadParamsError();
	} else {
		// This the error-handling middleware will be called after
		// all controllers run, so we need to make sure that we pass
		// all of the errors up to this point on to the next
		// error handler in the chain!
		next(err);
	}
};

// This is our generic handler that will be the last in our middleware chain:
const handleErrors = (err, req, res, next) => {
  // If the error contains a statusCode, set the variable to
  // that code and if not, set it to a default 500 code
  const statusCode = err.statusCode || 500;
  // If the error contains a message, set the variable to that
  // message and if not, set it to a generic 'Internal Server Error'
  const message = err.message || 'Internal Server Error';
  // Set the status and send the message as a response to the client
  res.status(statusCode).send(message);
};

module.exports = {
	handleValidateOwnership,
	handleValidateId,
	handleValidationErrors,
	handleErrors,
};