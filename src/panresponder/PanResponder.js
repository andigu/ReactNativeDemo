import React, { Component } from 'react'
import { LayoutAnimation, UIManager } from 'react-native'
import { Body, Container, Header, Title, View } from 'native-base'
import { SwipeableCard } from './SwipableCard'

export class PanResponderDemo extends Component {
  titles = new Array(10).fill(null).map((_, i) => `Card #${i}`)
  state = {
    closedIndices: []
  }

  constructor (props) {
    super(props)
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    this.shouldRender = this.shouldRender.bind(this)
  }

  shouldRender (index) {
    return this.state.closedIndices.indexOf(index) === -1
  }

  render () {
    return (
      <Container>
        <Header>
          <Body>
          <Title>
            Pan Responder Demo
          </Title>
          </Body>
        </Header>
        {this.titles.map((title, i) => this.shouldRender(i) &&
          <View key={i}><SwipeableCard title={title} onDismiss={() => {
            if ([...new Array(this.titles.length)].slice(i + 1, this.titles.length).some(this.shouldRender)) {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
            }
            this.setState({
              closedIndices: [...this.state.closedIndices, i]
            })
          }}/></View>)}
      </Container>
    )
  }
}
