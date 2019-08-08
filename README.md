# Would You Rather App

This is my solution for the Would You Rather App for Udacity's React Redux course. 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

new branch

## How to start App

To get started the application:

* install all project dependencies with `npm install`
* start the development server with `npm start`


## State managed by Store

Following state is managed by store:

### authedUser
Represeted as login user
`authedUserId`

### users
User info.
```
let users = {
    userId: {
        id: uderId,
        name: userName,
        avatarURL: avatarURL,
        answers: {
            questionId: selectedOption,
        },
        questions: [questionId,] 
    },
}
```

### questions
Question info.
```
let questions = {
    questionId: {
        id: questionId,
        author: userId,
        timestamp: timestamp,
        optionOne: {
            votes: [userId,],
            text: optionOneText,
        },
        optionTwo: {
            votes: [userId,],
            text: optionTwoText'
        }
    },
}
```

## Folder Structure and Components

```bash
|-- actions
|   |-- authedUser.js
|   |-- questions.js
|   |-- shared.js
|   `-- users.js
|-- assets
|   `-- images
|       |-- check-mark.svg
|       `-- logo.svg
|-- components
|   |-- App.js          # Application Root
|   |-- Dashboard.js    # Dashboard for home('/')
|   |-- Leaderboard.js  # Component for Leaderboard('/leaderboard')
|   |-- Nav.js          # Navbar
|   |-- NewQuestion.js  # Component for Creating new question('/add')
|   |-- Question.js     # Used as sub component of Dashboard
|   |-- QuestionDetail.js # Component for question detail page('/questions/:id')
|   |-- Result.js       # used as sub component of questionDetail, in case login user already answered
|   |-- SignIn.js       # SignIn
|   |-- SignOut.js      # SignOut
|   `-- Vote.js         # used as sub component of questionDetail, in case login user not answered
|-- index.js
|-- middleware
|   |-- index.js
|   `-- logger.js
|-- reducers
|   |-- authedUser.js
|   |-- index.js
|   |-- questions.js
|   `-- users.js
`-- utils
    |-- _DATA.js
    |-- api.js
    `-- helpers.js

```
