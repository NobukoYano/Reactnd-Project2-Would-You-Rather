import { RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_ANSWER } from '../actions/questions';

export default function questions (state={}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS :
            return {
                ...state,
                ...action.questions
            }
        
        // case TOGGLE_TWEET :
        //     return {
        //         ...state,
        //         [action.id]: {
        //             ...state[action.id],
        //             likes: action.hasLiked === true
        //                 ? state[action.id].likes.filter((uid) => uid !== action.authedUser)
        //                 : state[action.id].likes.concat([action.authedUser])
        //         }
        //     }
        case ADD_QUESTION :
            const { question } = action
            // const authedUser = question.author;
            return {
                ...state,
                [action.question.id]: question,
            }

        case SAVE_ANSWER :
            // console.log('Save_answer:',action)
            // console.log('Save Answer state:', state)
            const { authedUser, qid, answer } = action
            return {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat([authedUser])
                    }
                }
            }

        default :
            return state; 
    }
}