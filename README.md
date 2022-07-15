# Badjjr

## Project Description

This is the backend of our full stack MERN application, [Badjjr](https://badjjr.netlify.app).

It follows a RESTful architectural style and has full CRUD functionality. Here is what you can do with the Badjjr API:

| Quiz Request            | API Endpoint             |
| ----------------------- | ------------------------ |
| Get all quizzes         | `/api/quizzes`           |
| Get quizzes by category | `/api/quizzes/:category` |
| Get a quiz by id        | `/api/quizzes/:id`       |
| Create a new quiz       | `/api/quizzes`           |
| Update a quiz by id     | `/api/quizzes/:id`       |
| Delete a quiz by id     | `/api/quizzes/:id`       |

| Question Request        | API Endpoint         |
| ----------------------- | -------------------- |
| Create new questions\*  | `/api/questions`     |
| Update a question by id | `/api/questions/:id` |
| Delete a question by id | `/api/questions/:id` |

\*You can create one or more questions in a single request.

| User Request         | API Endpoint        |
| -------------------- | ------------------- |
| Create a new user    | `/api/users`        |
| Get an existing user | `/api/users/signin` |

## Technologies

The backend utilizes MongoDB, Express, Mongoose, CORS, as well Heroku (for deployment) Passport (for authentication), and Bcrypt (for encryption).

## Installation

# Frontend Instructions

1. Fork and clone the [frontend repository](https://github.com/badjjr/badjjr-frontend), and change into the new `badjjr-frontend` directory.
2. Run `npm i` to download the required dependencies.
3. Run `npm start` to start your React server.

# Backend Instructions

1. Fork and clone this repository, and change into the new `badjjr-backend` directory.
2. Run `npm i` to download the required dependencies.
3. Install `nodemon` if it is not already installed on your machine.
4. Create a `.env` file and add a `DATABASE_URL` variable with your MongoDB Atlas connection string. In your string, be sure the change the name of the database to "badjjr".
5. Run `nodemon` to start your server.

## Contributions

There is always room for improvement! If you have any suggestions, please submit an issue or create a pull request.

##

✨ Thank you for checking out Badjjr! ✨
