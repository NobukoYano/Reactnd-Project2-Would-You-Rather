import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

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
    }
    render() {
        const { optionOne, optionTwo } = this.state

        const optionOneLeft = 280 - optionOne.length
        const optionTwoLeft = 280 - optionTwo.length
        
        return (
            <div>
                <h3 className='center'>Compose new Question</h3>
                <form className='new-question' onSubmit={this.handleSubmit}>
                    <textarea
                        placeholder="What's option one?"
                        value={optionOne}
                        onChange={this.handleChangeOne}
                        className='textarea'
                        maxLength={280}
                    />
                    {optionOneLeft <= 100 &&(
                        <div className='question-length'>
                            {optionOneLeft}
                        </div>
                    )}
                    <textarea
                        placeholder="What's option Two?"
                        value={optionTwo}
                        onChange={this.handleChangeOne}
                        className='textarea'
                        maxLength={280}
                    />
                    {optionTwoLeft <= 100 &&(
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

export default connect()(NewQuestion)