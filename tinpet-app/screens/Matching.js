import AsyncStorage from '@react-native-community/async-storage'
import React, { useContext, useEffect, useState, useRef } from 'react'
import socketIOClient from 'socket.io-client'
import { Icon } from 'react-native-gradient-icon'
import { StyleSheet, View, Text, ImageBackground } from 'react-native'
import MatchingAction from '../app/components/Matching/MatchingAction'
import SwipeCard from '../app/components/Matching/SwipeCard'
import { ChangeDataContext } from '../app/contexts/ChangeData'
import Pulse from 'react-native-pulse'

const ENDPOINT = 'https://pets-tinder.herokuapp.com'
const defaultImg = require('../assets/img/dinesh.jpg')

function Matching({}) {
  const { isChanged, setIsChanged } = useContext(ChangeDataContext)
  const socket = socketIOClient(ENDPOINT)
  const swiper = useRef()
  const [data, setData] = useState([])
  const [token, setToken] = useState('')
  const [cardIndex, setCardIndex] = useState(0)
  const [cards, setCards] = useState()
  const [user, setUser] = useState({})

  useEffect(async () => {
    const _user = await AsyncStorage.getItem('user')
    const value = await AsyncStorage.getItem('canMatchingList')
    const token = await AsyncStorage.getItem('token')
    setUser(_user)
    setData(JSON.parse(value))
    setToken(token)
  }, [isChanged])

  useEffect(() => {
    if (data.length > 0) setCards(data)
  }, [data])

  const onSwiped = (type, index) => {
    if (type === 'right') {
      if (data[index]) {
        setCardIndex(index)
        socket.emit('like-user', {
          token: token,
          userId: cards[index]._id,
        })
        socket.on('like-user-response', async (data) => {
          if (!data.user_id && data.data) {
            console.log('match')
            await AsyncStorage.setItem(
              'matchingList',
              JSON.stringify(data.data)
            )
            setIsChanged(!isChanged)
          }
        })
      }
    } else {
      console.log('left')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.nothingLeft}>
        <View style={styles.avatarBox}>
          <ImageBackground
            source={user.avatar ? { uri: user.avatar } : defaultImg}
            style={styles.image}
          />
          <Pulse
            color="rgba(254, 95, 117, .5)"
            numPulses={3}
            diameter={400}
            speed={10}
            duration={2000}
          />
        </View>
        <Text style={styles.text}>
          Trong khu vực này không còn thú cưng nào để tương hợp cả
        </Text>
      </View>
      {data && (
        <SwipeCard
          cards={cards}
          token={token}
          onSwiped={(type, index) => onSwiped(type, index)}
          cardIndex={cardIndex}
          swiper={swiper}
        />
      )}
      <MatchingAction
        onPress={(type) => {
          if (type === 'right') {
            swiper.current.swipeRight()
          } else {
            swiper.current.swipeLeft()
          }
          onSwiped(type, cardIndex)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: '100%',
  },
  nothingLeft: {
    position: 'absolute',
    width: '100%',
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarBox: {
    width: 250,
    height: 250,
    borderRadius: 200,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 200,
    overflow: 'hidden',
    width: 80,
    height: 80,
    position: 'relative',
    zIndex: 9,
  },
  text: {
    marginTop: -50,
    width: '50%',
    color: '#777',
  },
})

export default Matching
