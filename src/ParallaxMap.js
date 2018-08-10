import React, { Component } from 'react'
import { Animated, Dimensions, Image, StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps'
import LinearGradient from 'react-native-linear-gradient'
import { Body, Card, CardItem, Header, Left, Text, Thumbnail, Title } from 'native-base'

const {height: screenHeight, width: screenWidth} = Dimensions.get('window')

export default class MyApp extends Component {
  scroll = new Animated.Value(0)
  headerY = Animated.multiply(Animated.diffClamp(this.scroll, 0, 56), -1)

  render () {
    const region = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    }
    return <View style={StyleSheet.absoluteFill}>

      <Animated.ScrollView scrollEventThrottle={5}
                           showsVerticalScrollIndicator={false}
                           style={{zIndex: 0}}
                           onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.scroll}}}], {useNativeDriver: true})}>
        <Animated.View style={{
          height: screenHeight * 0.8,
          width: '100%',
          transform: [{translateY: Animated.multiply(this.scroll, 0.5)}]
        }}>
          <MapView style={StyleSheet.absoluteFill}
                   region={region}>
            <MapView.Marker title="Location" coordinate={region}/>
          </MapView>
        </Animated.View>
        <View style={{position: 'absolute', height: screenHeight * 0.8, width: '100%'}}>
          <LinearGradient
            colors={['rgba(245,245,245,0.0)', 'rgba(245,245,245,0.35)', 'rgba(245,245,245,1)']}
            locations={[0, 0.7, 1]}
            style={StyleSheet.absoluteFill}/>
        </View>
        <View style={{
          transform: [{translateY: -100}],
          width: screenWidth,
          paddingHorizontal: 30,
          paddingVertical: 20,
          backgroundColor: 'transparent'
        }}>
          <View style={{...StyleSheet.absoluteFillObject, top: 100, backgroundColor: 'rgb(245,245,245)'}}/>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail
                  source={{uri: 'https://cdn.iconscout.com/public/images/icon/free/png-512/mcdonalds-logo-385626b10cb42d85-512x512.png'}}/>
                <Body>
                <Text>McDonalds</Text>
                <Text note>123 King Street</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://media-cdn.tripadvisor.com/media/photo-o/04/51/2a/54/mcdonald-s.jpg'}}
                     style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Text>
                McDonald's is a fast food company that was founded in 1940 as a restaurant operated by Richard and
                Maurice McDonald, in San Bernardino, California, United States. They rechristened their business as a
                hamburger stand. The first time a McDonald's franchise used the Golden Arches logo was in 1953 at a
                location in Phoenix, Arizona. In 1955, Ray Kroc, a businessman, joined the company as a franchise agent
                and proceeded to purchase the chain from the McDonald brothers. McDonald's had its original headquarters
                in Oak Brook, Illinois, but has approved plans to move its global headquarters to Chicago by 2018.[4][5]
              </Text>
            </CardItem>
          </Card>
        </View>
      </Animated.ScrollView>
      <Animated.View style={{
        width: '100%',
        position: 'absolute',
        transform: [{
          translateY: this.headerY
        }],
        flex: 1,
        backgroundColor: 'transparent'
      }}>
        <Header androidStatusBarColor={'#81c784'} style={{backgroundColor: '#98e59b'}} backgroundColor={'#98e59b'}>
          <Body>
          <Title style={{color: 'white'}}>
            McDonalds
          </Title>
          </Body>
        </Header>
      </Animated.View>
    </View>
  }
}
