import React, { Component } from 'react'
import { connect } from 'react-redux'
// import User from './User'

class Leaderboard extends Component {
    render() {
        const users = this.props.users
        console.log('Leaderboard:', users)
        return (
            <div>
                <h3 className='center'>Leadersborad!</h3>
                <ul className='dashboard-list'>
                    {Object.keys(users).map((key, index) =>(
                        <li key={users[key].id}>
                            <div className='question'>
                                <img
                                    src={users[key].avatarURL}
                                    alt={`Avatar of ${users[key].name}`}
                                    className='avatar'
                                />
                                <div className='question-info'>
                                    <div>
                                        <span>{users[key].name}</span>
                                        <p>Answered Questions : {Object.keys(users[key].answers).length || 0}</p>
                                        <p>Created Questions : {users[key].questions.length || 0}</p>
                                    </div>
                                </div>
                                <div>
                                    <p>Total : </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps ({ users }) {
    
    return {
        users
    }
}

export default connect(mapStateToProps)(Leaderboard)