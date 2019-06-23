import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { withRouter, Link } from 'react-router-dom'

class SignIn extends Component {
    state = {
        id: '',
    }
    handleChange = (e) => {
        const id = e.target.value
        console.log('onChange:', id)

        this.setState(() => ({
            id
        }))
    }
    
    handleSubmit = (e) => {
        // alert('Your have voted on option :' + this.state.value);
        console.log('onSubmit!')
        e.preventDefault();
        const { dispatch } = this.props
        const { id } = this.state
        console.log('onSubmit:', id)
        dispatch(setAuthedUser(id))

        this.setState(() => ({
            id: ''
        }))
        console.log('Test')
        this.props.history.goBack();

    }
    
    render() {
        const { users } = this.props
        return (
            <Link to="/signin" className='signin'>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    Please sign in as:
                        <select onChange={this.handleChange}>
                            {Object.keys(users).map((key, index) => (
                                <option key={users[key].id} value={users[key].id}>
                                {users[key].name}
                                </option>    
                            ))}
                        </select>
                    </label>
                    <button type="submit">Sign In</button>
                </form>
            </Link>
        )
    }
}

function mapStateToProps ({ users }) {
    return {
        users,
    }
}

export default withRouter(connect(mapStateToProps)(SignIn))