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
                        <p>{optionOne.text} ...</p>
                        <p>{optionTwo.text} ...</p>
                    </div>
                    <button onClick={(e) => this.goQuestionDetail(e, id)} >Go to details</button>
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