import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { withRouter } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class Dashboard extends Component {
    componentDidMount() {
        console.log('authedUser:', this.props.authedUser)
        if (this.props.authedUser === '') {
            this.props.history.push('/signin')
        }
        // Tabs.setUseDefaultStyles(false);
    }
    handleSelect(index, last) {
        console.log('Selected tab: ' + index + ', Last tab: ' + last);
    }
    render() {
        const {answeredId, unansweredId} = this.props
        return (
            <Fragment>
                <h3 className='center'>All Questions</h3>
                <Tabs
                    onSelect={this.handleSelect}
                    selectedIndex={1}
                >

                    <TabList>
                        <Tab>Unanswered</Tab>
                        <Tab>Answered</Tab>
                    </TabList>

                    <TabPanel>
                        <ul>
                            {unansweredId.map((id) =>(
                                <li key={id}>
                                    <Question id={id}></Question>
                                </li>
                            ))}
                        </ul>
                    </TabPanel>
                    <TabPanel>
                        <ul>
                            {answeredId.map((id) =>(
                                <li key={id}>
                                    <Question id={id}></Question>
                                </li>
                            ))}
                        </ul>    
                    </TabPanel>                            
                </Tabs>
            </Fragment>
        )
    }
}

function mapStateToProps ({ authedUser, questions, users }) {
    // const { questions, authedUser } = this.props
    const answeredId = []
    const unansweredId = []
  
    Object.keys(questions).map((id) => {
        return (
        questions[id].optionOne.votes.find((user) => user === authedUser)
        || questions[id].optionTwo.votes.find((user) => user === authedUser)
            ? answeredId.push(id)
            : unansweredId.push(id)
    )})
    console.log('answeredId:', answeredId)
    console.log('unansweredId:', unansweredId)

    return {
        authedUser,
        unansweredId,
        answeredId,
        // questionIds: Object.keys(questions)
        //     .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default withRouter(connect(mapStateToProps)(Dashboard))