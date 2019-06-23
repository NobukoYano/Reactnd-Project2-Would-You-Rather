import { RECEIVE_USERS, ADD_QUESTION_USER } from '../actions/users';

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
        default :
            return state; 
    }
}