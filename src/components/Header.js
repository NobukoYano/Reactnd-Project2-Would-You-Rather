import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { TiUser } from 'react-icons/ti/index'
import { Navbar, Nav } from 'react-bootstrap'

class Header extends Component {
    render () {
        const { users, authedUser } = this.props
        const name = (authedUser !== '')
            ? users[authedUser].name
            : ''
        return (
            <div>
                {authedUser === ''
                    ? <ul> 
                        <li>
                            <NavLink to='/signin'>
                                SignIn
                            </NavLink>
                        </li>
                        </ul>
                    : <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="/">Home</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/add">New Question</Nav.Link>
                            <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                        <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <TiUser />
                            Hi, {name}
                        </Navbar.Text>
                        </Navbar.Collapse>
                      </Navbar>              
                    }
            </div>            
        )
    }
}

function mapStateToProps({ authedUser, users }) {
    console.log('Test#', authedUser, users)
    return {
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(Header)