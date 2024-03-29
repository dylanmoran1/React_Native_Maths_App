/* eslint-disable semi */
import React from 'react'

import { PropTypes } from 'prop-types'
import { StatusBar, StyleSheet, Text, View } from 'react-native'

import RandomNumber from './RandomNumber'

class Game extends React.Component {
  static propTypes = {
    numberCount: PropTypes.number.isRequired
  }

  state = {
    selectedNumbers: []
  }

  randomNumbers = Array.from({ length: this.props.numberCount })
    .map(() => 1 + Math.floor(10 * Math.random()))

  target = this.randomNumbers.slice(0, this.props.numberCount - 2).reduce((acc, curr) => acc + curr, 0)
  // TODO:Make Chosen Numbers Position Random
  render () {
    return (
            <View style = {styles.container}>
                <Text style = {styles.target}>{this.target}</Text>
                <View style = {styles.randomNumsContainer}>
                  {this.randomNumbers.map((randomNumber, index) =>
                    <RandomNumber key = {index} number = {randomNumber}/>
                  )}
                </View>
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
  }
})

export default Game
