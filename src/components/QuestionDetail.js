import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../utils/helpers'
// import { TiArrowBackOutline } from 'react-icons/ti/index'
// import { TiHeartOutline } from 'react-icons/ti/index'
// import { TiHeartFullOutline } from 'react-icons/ti/index'
import { handleSaveAnswer } from '../actions/questions'
import { withRouter } from 'react-router-dom'
import Result from './Result'
import Vote from './Vote'
 
class QuestionDetail extends Component {
    handleAnswer = (e, selectedOption) => {
        e.preventDefault()
        console.log('handleAnswer!')
        console.log('Props:', this.props)
        
        // TODO: handle Answering question
        
        const {dispatch, authedUser, question} = this.props;
        dispatch(handleSaveAnswer({
            authedUser: authedUser, 
            qid: question.id, 
            answer: selectedOption,
        }))
    }

    render () {
        // console.log('Question: ', this.props)
        const { question, authedUser } = this.props
        if (authedUser === '') {
            this.props.history.push('/signin')
        }
        if (question === null) {
            return <p>This Question doesn't exist.</p>
        }
        const {
            name, avatar, timestamp, id, answered,
        } = question
        return (
            <div className='question'>
                <img
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className='avatar'
                />
                <div className='question-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                    {answered 
                            ? <Result id={id}/>
                            : <Vote id={id} onHandleAnswer={this.handleAnswer}/>}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser, users, questions}, props) {
    const id = props.match.params.id
    const question = questions[id]
    return {
        authedUser,
        question: question 
            ? formatQuestion(question, users[question.author], authedUser)
            : null
    }
}

export default withRouter(connect(mapStateToProps)(QuestionDetail))