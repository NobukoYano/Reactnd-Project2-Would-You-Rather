import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../utils/helpers'
import { TiInputChecked } from 'react-icons/ti/index'
// import { TiHeartOutline } from 'react-icons/ti/index'
// import { TiHeartFullOutline } from 'react-icons/ti/index'
import { withRouter } from 'react-router-dom'

class Question extends Component {
    goQuestionDetail = (e, id) => {
        e.preventDefault()
        this.props.history.push(`/questions/${id}`)

    }
    render () {
        const { question } = this.props
        if (question === null) {
            return <p>This Question doesn't exist.</p>
        }
        const {
            name, avatar, timestamp, id, optionOne, optionTwo, answered,
        } = question
        // const optionOneShort = optionOne.text.length > 30
        //     ? optionOne.text.substring(30)
        //     : optionOne
        // const optionTwoShort = optionTwo.text.length > 30
        // ? optionTwo.text.substring(30)
        // : optionTwo

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
                        <p>1. {optionOne.text}</p>
                        <p>2. {optionTwo.text}</p>
                    </div>
                    <button onClick={(e) => this.goQuestionDetail(e, id)} className='btn align-left'>Go to details</button>
                </div>
                {answered && (
                    <TiInputChecked className='question-answered'/>
                )}
            </div>
        )
    }
}

function mapStateToProps({authedUser, users, questions}, props) {
    const question = questions[props.id]
    return {
        authedUser,
        question: question 
            ? formatQuestion(question, users[question.author], authedUser)
            : null
    }
}

export default withRouter(connect(mapStateToProps)(Question))