import AsyncStorage from '@react-native-community/async-storage'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import MatchingAction from '../app/components/Matching/MatchingAction'
import SwipeCard from '../app/components/Matching/SwipeCard'
import { ChangeDataContext } from '../app/contexts/ChangeData'
import socketIOClient from 'socket.io-client'

const ENDPOINT = 'https://pets-tinder.herokuapp.com'

function Matching({ navigation }) {
  const socket = socketIOClient(ENDPOINT)
  const swiper = useRef()
  const [data, setData] = useState()
  const [token, setToken] = useState('')
  const [cardIndex, setCardIndex] = useState(0)
  const { isChanged } = useContext(ChangeDataContext)
  const [cards, setCards] = useState()

  useEffect(async () => {
    const value = await AsyncStorage.getItem('user')
    const token = await AsyncStorage.getItem('token')
    setData(JSON.parse(value).can_matching_list)
    setToken(token)
  }, [isChanged])

  useEffect(() => {
    const matchingList = []
    if (data?.length > 0) {
      data.map((item) => {
        matchingList.push(item)
      })
      setCards(matchingList)
    }
  }, [data])

  const onSwiped = (type, index) => {
    if (type === 'right') {
      if (data[index]) {
        setCardIndex(index)
        socket.emit('like-user', {
          token: token,
          userId: cards[index]._id,
        })
        socket.on('like-user-response', (data) => {
          console.log(data)
        })
      }
    } else {
      console.log('left')
    }
  }

  return (
    <View style={styles.container} onPress={() => {}}>
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
    backgroundColor: '#FFF',
  },
})

export default Matching
