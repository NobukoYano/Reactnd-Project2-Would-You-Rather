import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class SignIn extends Component {
    state = {
        id: '',
    }
    handleChange = (e) => {
        const id = e.target.value

        this.setState(() => ({
            id
        }))
    }
    
    handleSubmit = (e) => {
        // alert('Your have voted on option :' + this.state.value);
        e.preventDefault();
        const { dispatch } = this.props
        const { id } = this.state
        dispatch(setAuthedUser(id))

        this.setState(() => ({
            id: ''
        }))
        
    }
    
    render() {
        const { users } = this.props
        console.log('users:', users)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    Please sign in as:
                        <select value={this.state.value} onChange={this.handleChange}>
                            {Object.keys(users).map((key, index) => (
                                <option key={users[key].id} value={users[key].id}>
                                {users[key].name}
                                </option>    
                            ))}
                        </select>
                    </label>
                    <input type="submit" value="Sign In" />
                </form>
            </div>
        )
    }
}

function mapStateToProps ({ users }) {
    return {
        users,
    }
}

export default connect(mapStateToProps)(SignIn)