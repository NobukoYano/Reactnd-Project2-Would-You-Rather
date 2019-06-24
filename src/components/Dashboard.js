import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { withRouter } from 'react-router-dom'

class Dashboard extends Component {
    render() {
        const {authedUser, questionIds} = this.props
        if (authedUser === null) {
            return (
                <p>here...</p>
            )
        } else if (authedUser === '') {
            this.props.history.push('/signin')
        }    
        return (
            <div>
                <h3 className='center'>All Questions</h3>
                <ul className='dashboard-list'>
                    {questionIds.map((id) =>(
                        <li key={id}>
                            <Question id={id}></Question>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser, questions }) {
    return {
        authedUser,
        questionIds: Object.keys(questions)
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default withRouter(connect(mapStateToProps)(Dashboard))