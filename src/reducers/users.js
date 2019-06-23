import { 
    RECEIVE_USERS, 
    ADD_QUESTION_USER, 
    SAVE_ANSWER_USER 
} from '../actions/users';

export default function users (state={}, action) {
    switch(action.type) {
        case RECEIVE_USERS :
            return {
                ...state,
                ...action.users
            }
        case ADD_QUESTION_USER :
            return {
                ...state,
                [action.userId] : {
                    ...state[action.userId],
                    questions: state[action.userId].questions.concat([action.id])
                }
            }
        case SAVE_ANSWER_USER :
            const { authedUser, qid, answer } = action
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid]: answer
                    }
                }
            }
        default :
            return state; 
    }
}