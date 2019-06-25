import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { withRouter } from 'react-router-dom'

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
    }

    handleChangeOne = (e) => {
        const optionOne = e.target.value
        this.setState(() => ({
            optionOne
        }))
    }

    handleChangeTwo = (e) => {
        const optionTwo = e.target.value
        this.setState(() => ({
            optionTwo
        }))
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        const { optionOne, optionTwo } = this.state

        dispatch(handleAddQuestion(optionOne, optionTwo))

        this.setState(() => ({
            optionOne:'',
            optionTwo:'',
        }))

        this.props.history.push('/')
    }
    render() {
        const {authedUser} = this.props
        console.log('AuthedUser in new Question:', this.props)
        
        if (authedUser === '') {
            this.props.history.push('/signin')
            // return <Redirect to='signin' />
        }    

        const { optionOne, optionTwo } = this.state
        const optionOneLeft = 100 - optionOne.length
        const optionTwoLeft = 100 - optionTwo.length
        
        return (
            <div>
                <h3 className='center'>Compose new Question</h3>
                <form className='new-question' onSubmit={this.handleSubmit}>
                    <textarea
                        placeholder="What's option one?"
                        value={optionOne}
                        onChange={this.handleChangeOne}
                        className='textarea'
                        maxLength={100}
                    />
                    {optionOneLeft <= 20 &&(
                        <div className='question-length'>
                            {optionOneLeft}
                        </div>
                    )}
                    <textarea
                        placeholder="What's option Two?"
                        value={optionTwo}
                        onChange={this.handleChangeTwo}
                        className='textarea'
                        maxLength={100}
                    />
                    {optionTwoLeft <= 20 &&(
                        <div className='question-length'>
                            {optionTwoLeft}
                        </div>
                    )}
                    <button
                        className='btn'
                        type='submit'
                        disabled={optionOne==='' || optionTwo===''}
                    > Submit </button>
                </form>
            </div>
        )
    }
}
function mapStateToProps ({ authedUser }) {
    return {
        authedUser,
    }
}
export default withRouter(connect(mapStateToProps)(NewQuestion))