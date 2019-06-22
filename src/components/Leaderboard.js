import React, { Component } from 'react'
import { connect } from 'react-redux'
// import User from './User'

class Leaderboard extends Component {
    render() {
        return (
            <div>
                <h3 className='center'>All Questions</h3>
                <ul className='dashboard-list'>
                    {this.props.userIds.map((id) =>(
                        <li key={id}>
                            {id.name}
                            {/* <User id={id}></User> */}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps ({ users }) {
    return {
        userIds: Object.keys(users)
            .sort((a,b) => users[b].id - users[a].id)
    }
}

export default connect(mapStateToProps)(Leaderboard)