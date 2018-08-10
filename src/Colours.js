import React, { Component } from 'react'
import { Animated, Text, View } from 'react-native'

const SCROLL_HEIGHT = 800

export class Colours extends Component {
  nativeScroll = new Animated.Value(0)
  nonNativeScroll = new Animated.Value(0)

  constructor (props) {
    super(props)
    this.nativeScroll.addListener(Animated.event([{emitValue: this.nonNativeScroll}], {useNativeDriver: false}))
  }

  render () {
    const bgColor = this.nonNativeScroll.interpolate({
      inputRange: [0, 200],
      outputRange: ['rgb(30, 219, 93)', 'rgb(16, 178, 242)'],
      extrapolate: 'clamp'
    })
    return (
      <View style={{paddingTop: 20}}>
        <Animated.View style={{height: 100, width: 100, transform: [{translateX: this.nativeScroll}]}}>
          <Animated.View style={{width: '100%', height: '100%', backgroundColor: bgColor}}/>
        </Animated.View>
        <Animated.ScrollView onScroll={Animated.event([{
          nativeEvent: {
            contentOffset: {
              y: this.nativeScroll
            }
          }
        }], {useNativeDriver: true})} scrollEventThrottle={5}>
          <View style={{height: SCROLL_HEIGHT}}>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et nibh sem. Maecenas
              et lectus sodales, egestas justo eu, mattis neque. Suspendisse id ex risus. In sed
              pretium ipsum, tempor iaculis velit. Nulla tristique convallis auctor. Etiam aliquam
              sodales velit, non porta arcu ultricies eu. Suspendisse accumsan ante a est vehicula
              convallis. Phasellus eget orci laoreet, fringilla libero sit amet, maximus massa. In
              at blandit quam, vitae volutpat dui. Integer semper interdum sem a feugiat. In vel
              lectus sed mi efficitur suscipit. Nam molestie sapien sem, vitae luctus massa
              rhoncus nec. Curabitur viverra tristique sem, eu lobortis augue pellentesque sed.
              Sed eget tortor ut odio finibus sodales et in ante. Aenean eu felis sapien.
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Nulla id nunc lectus. Ut in fermentum justo. Mauris aliquam ultrices
              mauris, id ullamcorper ipsum porta non. Mauris eleifend nunc quis erat hendrerit,
              vitae tincidunt justo tristique. Etiam ultrices ac lorem id pretium.
            </Text>
          </View>
        </Animated.ScrollView>
      </View>
    )
  }
}
