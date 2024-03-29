/* eslint-disable semi */
import React from 'react'

import { PropTypes } from 'prop-types'
import { StatusBar, StyleSheet, Text, View } from 'react-native'

import RandomNumber from './RandomNumber'
import shuffle from 'lodash.shuffle'

class Game extends React.Component {
  static propTypes = {
    numberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired
  }

  state = {
    selectedIds: [],
    remainingSeconds: this.props.initialSeconds
  }

  gameStatus = 'PLAYING'

  randomNumbers = Array.from({ length: this.props.numberCount })
    .map(() => 1 + Math.floor(10 * Math.random()))

  target = this.randomNumbers.slice(0, this.props.numberCount - 2).reduce((acc, curr) => acc + curr, 0)
  // TODO:Make Chosen Numbers Position Random
  shuffledRandomNumbers = shuffle(this.randomNumbers)

  componentDidMount () {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => {
        return { remainingSeconds: prevState.remainingSeconds - 1 }
      }, () => {
        if (this.state.remainingSeconds === 0) {
          clearInterval(this.intervalId)
        }
      })
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.intervalId)
  }

  isNumberSelected = (numberIndex) => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0
  }

  selectNumber = (numberIndex) => {
    this.setState((prevState) => ({ selectedIds: [...prevState.selectedIds, numberIndex] })
    )
  }

  UNSAFE_componentWillUpdate (nextProps, nextState) {
    if (nextState.selectedIds !== this.state.selectedIds || nextState.remainingSeconds === 0) {
      this.gameStatus = this.calcGameStatus(nextState)
      if (this.gameStatus !== 'PLAYING') {
        clearInterval(this.intervalId)
      }
    }
  }

  calcGameStatus = (nextState) => {
    const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
      return acc + this.shuffledRandomNumbers[curr];
    }, 0)
    if (nextState.remainingSeconds === 0) {
      return 'LOST'
    }
    if (sumSelected < this.target) {
      return 'PLAYING'
    }

    if (sumSelected === this.target) {
      return 'WON'
    }

    return 'LOST'
  }

  render () {
    const gameStatus = this.gameStatus;
    return (
            <View style = {styles.container}>
                <Text style = {[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
                <View style = {styles.randomNumsContainer}>
                  {this.shuffledRandomNumbers.map((randomNumber, index) =>
                    <RandomNumber key = {index} id = {index} number = {randomNumber}
                    isSelected = {this.isNumberSelected(index) || gameStatus !== 'PLAYING'}
                    onPress = {this.selectNumber}/>
                  )}
                </View>
                <Text>{this.state.remainingSeconds}</Text>
                <StatusBar style="auto" />
            </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    paddingTop: 10
  },

  target: {
    fontSize: 50,
    color: 'red',
    backgroundColor: 'black',
    margin: 50,
    textAlign: 'center'
  },
  randomNumsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },

  STATUS_PLAYING: {
    backgroundColor: 'black'
  },

  STATUS_WON: {
    backgroundColor: 'green'
  },

  STATUS_LOST: {
    backgroundColor: 'red'
  }
})

export default Game
