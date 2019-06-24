import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

class Vote extends Component {
    state = {
        selectedOption: '',
    }
    handleChange = (e) => {
        const selectedOption = e.target.value
        this.setState(() => ({
            selectedOption: selectedOption
        }))
        // console.log('handleChange selected:', this.state)
    }
    
    handleSubmit = (e) => {
        // alert('Your have voted on option :' + this.state.value);
        e.preventDefault();
        console.log('Vote submitted:', this.state);
        
        const { onHandleAnswer } = this.props
        const { selectedOption } = this.state

        onHandleAnswer(e, selectedOption)

        this.setState(() => ({
            selectedOption:'',
        }))
    }
    
    render() {
        const { optionOne, optionTwo, } = this.props
        return (
            <Fragment>
                <h3>Would you rather...</h3>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="option"
                                value="optionOne"
                                checked={this.state.selectedOption === "optionOne"}
                                onChange={this.handleChange}
                            />
                            1: {optionOne.text}
                        </label>
                    </div>

                    <div>
                        <label>
                            <input
                            type="radio"
                            name="option"
                            value="optionTwo"
                            checked={this.state.selectedOption === "optionTwo"}
                            onChange={this.handleChange}
                            />
                            2: {optionTwo.text}
                        </label>
                    </div>

                    <div>
                        <button type="submit" className="btn">
                            Save
                        </button>
                    </div>
                </form>

                {/* <form onSubmit={this.handleSubmit}>
                    <label>
                    Would you rather ...
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="optionOne">{optionOne.text}</option>
                        <option value="optionTwo">{optionTwo.text}</option>
                    </select>
                    </label>
                    <input type="submit" value="Submit" />
                </form> */}
            </Fragment>
        )
    }
}

function mapStateToProps ({ questions, authedUser }, props) {
    const question = questions[props.id]
    const {id, optionOne, optionTwo} = question
    return {
        id,
        optionOne,
        optionTwo,
        authedUser,
    }
}

export default connect(mapStateToProps)(Vote)