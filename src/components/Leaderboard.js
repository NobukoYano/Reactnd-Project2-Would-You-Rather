import React, { Component } from 'react'
import { connect } from 'react-redux'
// import User from './User'

class Leaderboard extends Component {
    render() {
        const {authedUser, leaderBoards} = this.props
        if (authedUser === '') {
            this.props.history.push('/signin')
        }    
        // console.log('Leaderboard:', users)
        return (
            <div>
                <h3 className='center'>Leadersborad!</h3>
                <ul className='dashboard-list'>
                    {leaderBoards.map((user) =>(
                        <li key={user.id}>
                            <div className='question'>
                                <img
                                    src={user.avatar}
                                    alt={`Avatar of ${user.name}`}
                                    className='avatar'
                                />
                                <div className='question-info'>
                                    <div>
                                        <span>{user.name}</span>
                                        <p>Answered Questions : {user.answers}</p>
                                        <p>Created Questions  : {user.questions}</p>
                                    </div>
                                </div>
                                <p className="total-score">{(user.answers+user.questions)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser, users }) {
    const leaderBoards = Object.keys(users).map((userId) =>{
        return {
            id: userId,
            name: users[userId].name,
            avatar: users[userId].avatarURL,
            answers: Object.keys(users[userId].answers).length || 0,
            questions: users[userId].questions.length || 0,
        }
    })
    console.log('leaderboards:', leaderBoards)
    return {
        authedUser,
        leaderBoards: leaderBoards.sort((a, b) =>
            (b.answers + b.questions)
            - (a.answers + a.questions)
        )
    }
}

export default connect(mapStateToProps)(Leaderboard)