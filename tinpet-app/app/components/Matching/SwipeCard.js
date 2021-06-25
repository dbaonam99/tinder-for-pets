import React, { useEffect, useState } from 'react'
import Swiper from 'react-native-deck-swiper'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native'
import { Icon } from 'react-native-gradient-icon'
import LinearGradient from 'react-native-linear-gradient'
const img = require('../../../assets/img/dinesh.jpg')

export default function Matching({ cards, token, onSwiped, cardIndex }) {
  const renderCard = (card, index) => {
    return (
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={card.avatar ? { uri: card.avatar } : img}
            style={styles.image}
          />
          <LinearGradient
            colors={[
              'rgba(0, 0, 0, 0)',
              'rgba(0, 0, 0, .5)',
              'rgba(0, 0, 0, .8)',
            ]}
            style={styles.info}
          >
            <View style={styles.first}>
              <Text style={styles.name}>{card.full_name || card.username}</Text>
              <Text style={styles.icon}>
                <Icon
                  size={25}
                  type="material"
                  name="verified"
                  color="#0c70ff"
                />
              </Text>
            </View>
            {card.bio && (
              <View style={styles.second}>
                <Text style={styles.bio}>{card.bio}</Text>
              </View>
            )}
            <View style={styles.third}>
              {card?.hobbies.map((item) => {
                if (item) {
                  return (
                    <View style={styles.hobby} key={item}>
                      <Text style={styles.hobbyText}>{item}</Text>
                    </View>
                  )
                } else return
              })}
            </View>
          </LinearGradient>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {cards && (
        <Swiper
          ref={(swiper) => {
            swiper = swiper
          }}
          backgroundColor={'#FFF'}
          // onSwiped={() => onSwiped('general')}
          onSwipedLeft={(index) => onSwiped('left', index)}
          onSwipedRight={(index) => onSwiped('right', index)}
          onSwipedTop={(index) => onSwiped('right', index)}
          onSwipedBottom={(index) => onSwiped('left', index)}
          // onTapCard={swipeLeft}
          cards={cards}
          cardIndex={cardIndex}
          cardVerticalMargin={20}
          cardHorizontalMargin={5}
          renderCard={renderCard}
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
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 20,
    paddingTop: 50,
    flexDirection: 'column',
  },
  first: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  name: {
    fontSize: 34,
    color: '#FFF',
    fontWeight: 'bold',
    marginRight: 20,
  },
  icon: {
    width: 22,
    height: 22,
  },
  bio: {
    fontSize: 20,
    color: '#FFF',
  },
  third: {
    marginVertical: 10,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hobby: {
    marginRight: 5,
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(160, 160, 160, .6)',
  },
  hobbyText: {
    color: '#FFF',
    fontSize: 16,
  },
})
