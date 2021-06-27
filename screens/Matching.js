import AsyncStorage from '@react-native-community/async-storage'
import React, { useContext, useEffect, useState, useRef } from 'react'
import socketIOClient from 'socket.io-client'
import { StyleSheet, View, Text, ImageBackground } from 'react-native'
import { ChangeDataContext } from '../app/contexts/ChangeData'
import { MatchingListContext } from '../app/contexts/MatchingList'
import MatchingAction from '../app/components/Matching/MatchingAction'
import SwipeCard from '../app/components/Matching/SwipeCard'
import CustomToast from '../app/components/Share/CustomToast'
import Pulse from 'react-native-pulse'
import Toast from 'react-native-toast-message'

const ENDPOINT = 'https://pets-tinder.herokuapp.com'
const defaultImg = require('../assets/img/dinesh.jpg')

function Matching({}) {
  const { isChanged, setIsChanged } = useContext(ChangeDataContext)
  const { matchingList, setMatchingList } = useContext(MatchingListContext)
  const socket = socketIOClient(ENDPOINT)
  const swiper = useRef()
  const [data, setData] = useState([])
  const [token, setToken] = useState('')
  const [cardIndex, setCardIndex] = useState(0)
  const [cards, setCards] = useState()
  const [user, setUser] = useState({})
  const [cardCount, setCardCount] = useState(0)

  useEffect(async () => {
    const _user = await AsyncStorage.getItem('user')
    const value = await AsyncStorage.getItem('canMatchingList')
    const token = await AsyncStorage.getItem('token')
    setUser(JSON.parse(_user))
    setData(JSON.parse(value))
    setToken(token)
    setCardCount(JSON.parse(value).length)
  }, [isChanged])

  useEffect(() => {
    if (data.length > 0) setCards(data)
  }, [data])

  useEffect(() => {
    const asyncFunc = async () => {
      const token = await AsyncStorage.getItem('token')
      const matchingListId = matchingList.map((item) => item._id)
      socket.emit('join', {
        token: token,
        userIds: matchingListId,
      })
      socket.on('send-message-response', async (data) => {
        setMatchingList(data.matching_list)
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Có người đã gửi tin nhắn cho bạn 👋',
          text2: 'Cùng trò truyện ngay nào!',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 0,
          bottomOffset: 40,
        })
      })
    }
    asyncFunc()
  }, [isChanged])

  const onSwiped = (type, index) => {
    if (type === 'right') {
      if (data[index]) {
        const _cardCount = cardCount - 1
        setCardCount(_cardCount)
        setCardIndex(index)
        socket.emit('like-user', {
          token: token,
          userId: cards[index]._id,
        })
        socket.on('like-user-response', async (data) => {
          if (!data.user_id && data.data) {
            Toast.show({
              type: 'success',
              position: 'top',
              text1: 'Thú cưng của bạn đã có đối tượng mới 👋',
              text2: 'Cùng trò truyện ngay nào!',
              visibilityTime: 4000,
              autoHide: true,
              topOffset: 0,
              bottomOffset: 40,
            })
            setMatchingList(data.data)
            setIsChanged(!isChanged)
          }
        })
      }
    } else {
      const _cardCount = cardCount - 1
      setCardCount(_cardCount)
    }
  }

  const toastConfig = {
    success: ({ text1, text2, props, ...rest }) => (
      <CustomToast text1={text1} text2={text2} />
    ),
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          zIndex: 99999,
        }}
      >
        <Toast ref={(ref) => Toast.setRef(ref)} config={toastConfig} />
      </View>
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
          if (cardCount > 0) {
            if (type === 'right') {
              swiper.current.swipeRight()
            } else {
              swiper.current.swipeLeft()
            }
            onSwiped(type, cardIndex)
          }
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
