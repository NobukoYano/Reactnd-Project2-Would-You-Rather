import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { withRouter, Link } from 'react-router-dom'

const default_user = 'sarahedo'

class SignIn extends Component {
    state = {
        id: default_user,
    }
    handleChange = (e) => {
        const id = e.target.value
        console.log('onChange:', id)

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
        this.props.history.goBack();
    }
    
    render() {
        const { users } = this.props
        return (
            <Link to="/signin" className='signin'>
                <form>
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
                    <button type="submit" onClick={this.handleSubmit}>Sign In</button>
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