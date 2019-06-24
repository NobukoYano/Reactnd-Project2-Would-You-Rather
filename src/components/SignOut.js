import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { withRouter } from 'react-router-dom'

class SignOut extends Component {
    handleSignout = () => {
        const { dispatch } = this.props
        dispatch(setAuthedUser(''))
        this.props.history.push('/')
    }    
    render() {
        this.handleSignout()
        return (
            <div>
                <p>Thanks for visiting!</p>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser}) {
    return {
        authedUser,
    }
}

export default withRouter(connect(mapStateToProps)(SignOut))