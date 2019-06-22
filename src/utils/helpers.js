export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
  }
  
  export function formatQuestion (question, author, authedUser) {
    const { id, timestamp, optionOne, optionTwo } = question
    const { name, avatarURL } = author
    let answered = null
    if (optionOne.votes.find(id => id === authedUser)) {
      // console.log('One:', optionOne.votes.find(id => id === authedUser))
      answered = 'optionOne'
    } else if (optionTwo.votes.find(id => id === authedUser)) {
      // console.log('Two',optionTwo.votes.filter(id => id === authedUser))
      answered = 'optionTwo'
    }
    // const answered = (optionOne.votes.filter(id => id === authedUser))
    //     ? 'optionOne'
    //     : optionTwo.votes.find(authedUser)
    //         ? 'optionTwo'
    //         : null 
    // console.log('option one:', optionOne)
    // console.log('option one votes:', optionOne.votes)
    // console.log('answered:', answered)
    return {
      name,
      id,
      timestamp,
      avatar: avatarURL,
      optionOne,
      optionTwo,
      answered,
    }
  }