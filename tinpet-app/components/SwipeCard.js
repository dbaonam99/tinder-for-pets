import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native'

export default class Matching extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [
        {
          id: '1',
          src: 'https://www.elle.vn/wp-content/uploads/2021/02/08/424779/blackpink-rose-ice-cream.jpg',
        },
        {
          id: '2',
          src: 'https://afamilycdn.com/150157425591193600/2021/4/30/d1-1619800731773450688569.jpeg',
        },
        {
          id: '3',
          src: 'https://cdnmedia.thethaovanhoa.vn/Upload/qeXw6Srue12aQG46um9kw/files/2021/02/12/the-show-blackpink-6.jpg',
        },
        {
          id: '4',
          src: 'https://baoquocte.vn/stores/news_dataimages/dieulinh/032021/18/11/rose-blackpink-pha-moi-ky-luc-voi-san-pham-am-nhac-solo-dau-tay.jpg?rt=20210318112645',
        },
      ],
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0,
    }
  }

  renderCard = (card, index) => {
    return (
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <ImageBackground source={{ uri: card.src }} style={styles.image} />
        </View>
      </View>
    )
  }

  onSwiped = (type) => {
    console.log(`on swiped ${type}`)
  }

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Swiper
          ref={(swiper) => {
            this.swiper = swiper
          }}
          backgroundColor={'#FFF'}
          onSwiped={() => this.onSwiped('general')}
          onSwipedLeft={() => this.onSwiped('left')}
          onSwipedRight={() => this.onSwiped('right')}
          onSwipedTop={() => this.onSwiped('top')}
          onSwipedBottom={() => this.onSwiped('bottom')}
          // onTapCard={this.swipeLeft}
          cards={this.state.cards}
          cardIndex={this.state.cardIndex}
          cardVerticalMargin={20}
          cardHorizontalMargin={5}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          stackSize={2}
          stackSeparation={0}
          overlayLabels={{
            bottom: {
              title: 'NOPE',
              style: {
                label: {
                  borderColor: '#fa2556',
                  color: '#fa2556',
                  borderWidth: 5,
                  opacity: 0.5,
                  transform: [{ rotate: '30deg' }],
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            left: {
              title: 'NOPE',
              style: {
                label: {
                  borderColor: '#fa2556',
                  color: '#fa2556',
                  borderWidth: 5,
                  opacity: 0.5,
                  transform: [{ rotate: '30deg' }],
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  borderColor: '#26ce7e',
                  color: '#26ce7e',
                  opacity: 0.5,
                  borderWidth: 5,
                  transform: [{ rotate: '-30deg' }],
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30,
                },
              },
            },
            top: {
              title: 'SUPER LIKE',
              style: {
                label: {
                  borderColor: '#1f88eb',
                  color: '#2289eb',
                  opacity: 0.7,
                  borderWidth: 5,
                  transform: [{ rotate: '-30deg' }],
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              },
            },
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
        ></Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'red',
  },
  card: {
    height: Dimensions.get('window').height - 230,
    borderRadius: 10,
    backgroundColor: '#DDD',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
})
