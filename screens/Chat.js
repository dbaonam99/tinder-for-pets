import AsyncStorage from '@react-native-community/async-storage'
import React, { useContext, useState, useEffect } from 'react'
import {
  StyleSheet,
  ScrollView,
  Text,
  ImageBackground,
  View,
} from 'react-native'
import ChatAvatar from '../app/components/Chat/ChatAvatar'
import ChatLine from '../app/components/Chat/ChatLine'
import { ChangeDataContext } from '../app/contexts/ChangeData'
import { MatchingListContext } from '../app/contexts/MatchingList'
import socketIOClient from 'socket.io-client'

const ENDPOINT = 'https://pets-tinder.herokuapp.com'
const chatEmpty = require('../assets/img/chat.png')

function Chat({ navigation }) {
  const socket = socketIOClient(ENDPOINT)
  const [data, setData] = useState([])
  const [user, setUser] = useState({})
  const [chatList, setChatList] = useState([])
  const { isChanged, setIsChanged } = useContext(ChangeDataContext)
  const { matchingList, setMatchingList } = useContext(MatchingListContext)

  useEffect(async () => {
    const token = await AsyncStorage.getItem('token')
    fetch(`https://pets-tinder.herokuapp.com/api/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        setMatchingList(res.data.matching_list)
        setIsChanged(!isChanged)
      })
  }, [])

  useEffect(async () => {
    const value = await AsyncStorage.getItem('user')
    const data = JSON.parse(value)
    setUser(data)
    setData(matchingList.filter((item) => item.had_message === false))
    setChatList(matchingList.filter((item) => item.had_message === true))
  }, [isChanged, matchingList])

  const handleOnPress = async (item) => {
    const token = await AsyncStorage.getItem('token')
    fetch(`https://pets-tinder.herokuapp.com/api/chat?userId=${item._id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        socket.emit('join', {
          token: token,
          userIds: [item._id],
        })
        navigation.navigate('ChatBox', {
          data: item,
          token,
          chat: res.data,
          user,
        })
      })
  }

  return (
    <ScrollView
      style={styles.match}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {data.length > 0 && <Text style={styles.title}>Tương hợp mới</Text>}
      {data.length > 0 && (
        <ScrollView
          style={styles.newMatch}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {data.map((item, index) => {
            return (
              <ChatAvatar
                key={index}
                name={item.full_name || item.username}
                avatar={item.avatar}
                onPress={() => handleOnPress(item)}
              />
            )
          })}
        </ScrollView>
      )}
      {chatList?.length > 0 && <Text style={styles.title}>Tin nhắn</Text>}
      <ScrollView style={styles.chatList} showsVerticalScrollIndicator={false}>
        {chatList?.map((item, index) => {
          return (
            <ChatLine
              key={index}
              name={item.full_name ? item.full_name : item.username}
              message={item.message.message}
              onPress={() => handleOnPress(item)}
              isUserSending={item.message.user_post._id === user._id}
              isSeen={item.message.is_seen}
              avatar={item.avatar}
            />
          )
        })}
      </ScrollView>
      {chatList.length === 0 && (
        <View style={styles.imageBox}>
          <ImageBackground source={chatEmpty} style={styles.image} />
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  imageBox: {
    width: '100%',
    // minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 500,
  },
  match: {
    backgroundColor: '#FFF',
    minHeight: '100%',
  },
  newMatch: {
    flexDirection: 'row',
    overflow: 'scroll',
    height: 110,
  },
  title: {
    margin: 8,
    fontWeight: '500',
    color: '#fe1c15',
  },
})

export default Chat
