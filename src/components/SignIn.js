import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { withRouter, Link } from 'react-router-dom'
import logo from '../assets/images/logo.svg';

const default_user = 'sarahedo'

class SignIn extends Component {
    state = {
        id: default_user,
    }
    componentDidMount() {
        if (this.props.authedUser !== '') {
            this.props.history.push('/')
        }
    }
    handleChange = (e) => {
        const id = e.target.value
        // console.log('onChange:', id)

        this.setState(() => ({
            id
        }))
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch } = this.props
        const { id } = this.state
        dispatch(setAuthedUser(id))

        this.setState(() => ({
            id: default_user
        }))
        // console.log('Signin history.goBack():', this.props.history.goBack())
        this.props.history.goBack() || this.props.history.push('/');
    }
    
    render() {
        const { users } = this.props
        return (
            <Link to="/signin" className='signin'>
                <form>
                    <img src={logo} className="App-logo" alt="logo" />
                    <br /> 
                    <label>
                        <p>Please sign in as:</p>
                        <select onChange={this.handleChange}>
                            {Object.keys(users).map((key, index) => (
                                <option key={users[key].id} value={users[key].id}>
                                {users[key].name}
                                </option>    
                            ))}
                        </select>
                    </label>
                    <br/>
                    <button type="submit" className='btn' onClick={this.handleSubmit}>Sign In</button>
                </form>
            </Link>
        )
    }
}

function mapStateToProps ({ users, authedUser }) {
    return {
        users,
        authedUser,
    }
}

export default withRouter(connect(mapStateToProps)(SignIn))