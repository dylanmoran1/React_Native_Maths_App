import React from 'react'

import { PropTypes } from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

class RandomNumber extends React.Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
  }

  handlePress = () => {
    if (this.props.isSelected) { return }
    this.props.onPress(this.props.id)
  }

  render () {
    return (
            <TouchableOpacity onPress={this.handlePress}>
                <Text style = {[styles.randomNums, this.props.isSelected && styles.selected]}>{this.props.number}</Text>
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
  },

  selected: {
    opacity: 0.3
  }
})

export default RandomNumber
