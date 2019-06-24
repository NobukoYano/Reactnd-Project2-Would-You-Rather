import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { TiUser } from 'react-icons/ti/index'

class Nav extends Component {
    render () {
        const { users, authedUser } = this.props
        const name = (authedUser !== '')
            ? users[authedUser].name
            : ''
        return (
            <nav className='nav'>
                {authedUser === ''
                    ? <ul> 
                        <li>
                            <NavLink to='/signin' activeClassName='active' className='navlink'>
                                SignIn
                            </NavLink>
                        </li>
                        </ul>
                    : <ul>
                        <li>
                            <NavLink to='/' exact activeClassName='active' className='navlink'>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/add' activeClassName='active' className='navlink'>
                                New Question
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/leaderboard' activeClassName='active' className='navlink'>
                                Leaderboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/signout' activeClassName='active' className='navlink'>
                                SignOut
                            </NavLink>
                        </li>
                        <li>
                            <TiUser /> Hi, {name}
                        </li>
                    </ul>
                    }
            </nav>
        )
    }
}

function mapStateToProps({ authedUser, users }) {
    // console.log('Test#', authedUser, users)
    return {
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(Nav)