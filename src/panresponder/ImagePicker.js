import React, { Component } from 'react'
import { Animated, Dimensions, Easing, PanResponder, StyleSheet, View } from 'react-native'
import { Card } from './Card'

const {width: screenWidth, height: screenHeight} = Dimensions.get('window')

export class Sliding extends Component {
  bottomPadding = 10
  translateY = new Animated.Value(-this.bottomPadding)
  data = new Array(20).fill({
    name: 'John Smith',
    title: 'Marketing Head',
    address: 'Address',
    email: 'johnsmith@gmail.com'
  })
  bottoms = this.data.map((_, i) =>
    Animated.add(Animated.multiply(this.translateY, -1), i * screenHeight / 8).interpolate({
      inputRange: [0, screenHeight - 200, screenHeight - 199],
      outputRange: [0, screenHeight - 200, screenHeight - 200]
    }))
  panresponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: Animated.event([null, {dy: this.translateY}]),
    onPanResponderRelease: (_, {vy}) => {
      this.translateY.extractOffset()
      Animated.timing(this.translateY, {
        toValue: vy * 1000,
        duration: 1000,
        easing: Easing.poly(0.5)
      }).start(() => {
        const yOffset = this.bottoms.reduce((prevVal, x) =>
          Math.abs(x.__getValue()) < Math.abs(prevVal) ? x.__getValue() : prevVal, Infinity)
        this.translateY.extractOffset()
        Animated.spring(this.translateY, {
          toValue: yOffset - this.bottomPadding,
          duration: 100,
          friction: 5
        }).start(this.translateY.extractOffset.bind(this))
      })
    }
  })
  colors = ['#ff5252', '#e040fb', '#7c4dff', '#448aff', '#64ffda', '#ff6e40']

  render () {
    return <View
      style={{width: screenWidth, height: screenHeight, backgroundColor: 'black'}} {...this.panresponder.panHandlers}>
      {this.data.slice().reverse().map((x, index) => {
          const i = this.data.length - index - 1
          const bottom = this.bottoms[i]
          const pullDown = bottom.interpolate({
            inputRange: [this.bottomPadding - 1, this.bottomPadding, this.bottomPadding + 1],
            outputRange: [-4, 0, 0],
            extrapolateLeft: 'extend'
          })
          const scale = Animated.multiply(Animated.add(Animated.divide(bottom, screenHeight), -1), -1).interpolate({
            inputRange: [0.1, 1, 1.1],
            outputRange: [0.1, 1, 1],
            extrapolate: 'clamp'
          })
          const perspective = new Animated.Value(0)
          perspective.__getValue = () => {
            const x = bottom.__getValue()
            return x > 0 ? 13 * Math.pow(x, 0.6) : x
          }
          const opacity = bottom.interpolate({
            inputRange: [this.bottomPadding, screenHeight - 200],
            outputRange: [0, 0.3],
            extrapolate: 'clamp'
          })
          return <Animated.View key={i}
                                style={{
                                  position: 'absolute',
                                  transform: [{scale}],
                                  bottom: Animated.add(perspective, pullDown)
                                }}>
            <Card color={this.colors[i % this.colors.length]} data={x}/>
            <Animated.View style={{
              ...StyleSheet.absoluteFillObject,
              width: '100%',
              height: '100%',
              backgroundColor: '#4c4c4c',
              opacity
            }}/>
          </Animated.View>
        }
      )}
    </View>
  }
}
