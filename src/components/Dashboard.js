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
    }
    render() {
        const {questionIds} = this.props
        return (
            <Fragment>
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
            </Fragment>
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