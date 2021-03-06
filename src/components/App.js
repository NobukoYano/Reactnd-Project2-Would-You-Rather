import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import QuestionDetail from './QuestionDetail'
import Leaderboard from './Leaderboard'
import SignIn from './SignIn'
import SignOut from './SignOut'
import Nav from './Nav'
// import Header from './Header'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
            {this.props.loading === true
              ? null
              : 
                <div>
                  {/* <Header /> */}
                  <Nav /> 
                  <div className='container'>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/questions/:id' component={QuestionDetail} />
                    <Route path='/add' component={NewQuestion} />
                    <Route path='/leaderboard' component={Leaderboard} />
                    <Route path='/signin' component={SignIn} />
                    <Route path='/signOut' component={SignOut} />
                  </div>
                </div>}
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)