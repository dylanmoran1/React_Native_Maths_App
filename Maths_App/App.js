import React from 'react'
import Game from './src/components/Game'

class App extends React.Component {
  render () {
    return (

      <Game numberCount={6} initialSeconds = {10}/>
    )
  }
}

export default App
