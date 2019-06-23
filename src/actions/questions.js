import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { addQuestionUser, saveAnswerUser } from '../actions/users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_ANSWER = 'SAVE_ANSWER';
export const ADD_QUESTION = 'ADD_QUESTION';

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser,
        })
            .then((question) => {
                dispatch(addQuestion(question))
                dispatch(addQuestionUser(authedUser, question.id))
            })
            .then(() => dispatch(hideLoading()))
    }
}

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

function saveAnswer ({authedUser, qid, answer}) {
    return {
        type: SAVE_ANSWER,
        authedUser,
        qid,
        answer,
    }
}

export function handleSaveAnswer (info) {
    return (dispatch) => {
        console.log('Info:', info)
        dispatch(saveAnswer(info))
        dispatch(saveAnswerUser(info))

        return saveQuestionAnswer(info)
            .catch((e) => {
                console.warn('Error in saving question answer: ', e)
                dispatch(saveAnswer(info));
                dispatch(saveAnswerUser(info));
                alert('There was an error answering the question. Try Again')
            })
    }
}