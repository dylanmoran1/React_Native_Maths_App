import React from 'react'

import { PropTypes } from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

class RandomNumber extends React.Component {
  static propTypes = {
    number: PropTypes.number.isRequired
  }

  handlePress = () => {
    console.log(this.props.number)
  }

  render () {
    return (
            <TouchableOpacity onPress={this.handlePress}>
                <Text style = {styles.randomNums}>{this.props.number}</Text>
            </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  randomNums: {
    fontSize: 40,
    color: 'red',
    width: 100,
    backgroundColor: 'black',
    marginHorizontal: 15,
    marginVertical: 25,
    textAlign: 'center'
  }
})

export default RandomNumber
