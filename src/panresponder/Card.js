import React, { Component } from 'react'
import { Dimensions, Text, View } from 'react-native'
import { Col, Grid, Icon, Row } from 'native-base'

const {width: screenWidth} = Dimensions.get('window')

export class Card extends Component {
  render () {
    const center = {justifyContent: 'center', alignItems: 'center'}
    const vertCenter = {alignItems: 'center'}
    const icon = {color: '#9b9b9b', fontSize: 40}
    const text = {fontSize: 20, color: this.props.color}
    return <View style={{
      width: screenWidth,
      height: 250,
      borderRadius: 10,
      borderWidth: 7,
      borderColor: this.props.color,
      backgroundColor: 'white'
    }}>
      <Grid>
        <Col size={1}>
          <Row style={center}>
            <Icon name="person" style={icon}/>
          </Row>
          <Row style={center}>
            <Icon name="call" style={icon}/>
          </Row>
          <Row style={center}>
            <Icon name="mail" style={icon}/>
          </Row>
        </Col>
        <Col size={3}>
          <Row style={vertCenter}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 25, fontWeight: '800'}}>John Smith</Text>
              <Text style={text}>Marketing Head</Text>
            </View>
          </Row>
          <Row style={vertCenter}>
            <Text style={text}>1 King Street, Los Angeles</Text>
          </Row>
          <Row style={vertCenter}>
            <Text style={text}>johnsmith@mail.com</Text>
          </Row>
        </Col>
      </Grid>
    </View>
  }
}
