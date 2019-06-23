import React, { Component } from 'react'
import { connect } from 'react-redux'

class Vote extends Component {
    state = {
        value: '',
    }
    handleChange(e) {
        this.setState({value: e.target.value});
    }
    
    handleSubmit(e) {
        // alert('Your have voted on option :' + this.state.value);
        e.preventDefault();
        console.log('Vote submitted');
    }
    
    render() {
        const { id, optionOne, optionTwo, authedUser } = this.props
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    Would you rather ...
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="optionOne">{optionOne.text}</option>
                        <option value="optionTwo">{optionTwo.text}</option>
                    </select>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
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