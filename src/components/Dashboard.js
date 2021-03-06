import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { withRouter } from 'react-router-dom'

class Dashboard extends Component {
    componentDidMount() {
        console.log('authedUser:', this.props.authedUser)
        if (this.props.authedUser === '') {
            this.props.history.push('/signin')
        }
        // Tabs.setUseDefaultStyles(false);
    }
    handleSelect(index, last) {
        console.log('Selected tab: ' + index + ', Last tab: ' + last);
    }
    render() {
        const {answeredId, unansweredId} = this.props
        return (
            <Fragment>
                <h2 className='center'>All Questions</h2>
                <hr />
                <h3 className='center'>Unanswered question(s)</h3>
                <ul>
                    {unansweredId.map((id) =>(
                        <li key={id}>
                            <Question id={id}></Question>
                        </li>
                    ))}
                </ul>
                <hr/>
                <h3 className='center'>Answered question(s)</h3>
                <ul>
                    {answeredId.map((id) =>(
                        <li key={id}>
                            <Question id={id}></Question>
                        </li>
                    ))}
                </ul>    
            </Fragment>
        )
    }
}

function mapStateToProps ({ authedUser, questions, users }) {
    // const { questions, authedUser } = this.props
    const answeredId = []
    const unansweredId = []
  
    Object.keys(questions).map((id) => {
        return (
        questions[id].optionOne.votes.find((user) => user === authedUser)
        || questions[id].optionTwo.votes.find((user) => user === authedUser)
            ? answeredId.push(id)
            : unansweredId.push(id)
    )})
    console.log('answeredId:', answeredId)
    console.log('unansweredId:', unansweredId)

    return {
        authedUser,
        unansweredId,
        answeredId,
        // questionIds: Object.keys(questions)
        //     .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default withRouter(connect(mapStateToProps)(Dashboard))