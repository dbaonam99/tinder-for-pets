import AsyncStorage from '@react-native-community/async-storage'
import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
import ChatAvatar from '../app/components/Chat/ChatAvatar'
import ChatLine from '../app/components/Chat/ChatLine'
import { ChangeDataContext } from '../app/contexts/ChangeData'
import socketIOClient from 'socket.io-client'

const ENDPOINT = 'https://pets-tinder.herokuapp.com'
function Chat({ navigation }) {
  const socket = socketIOClient(ENDPOINT)
  const [data, setData] = useState()
  const [user, setUser] = useState({})
  const [chatList, setChatList] = useState([])
  const { isChanged, setIsChanged } = useContext(ChangeDataContext)

  useEffect(async () => {
    const value = await AsyncStorage.getItem('user')
    const token = await AsyncStorage.getItem('token')
    const data = JSON.parse(value)
    setUser(data)
    setData(data.matching_list)

    fetch(`https://pets-tinder.herokuapp.com/api/chat?userId=${data._id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        setChatList(res.data)
      })
  }, [isChanged])

  const handleOnPress = async () => {
    const token = await AsyncStorage.getItem('token')
    fetch(`https://pets-tinder.herokuapp.com/api/chat?userId=${data[0]._id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        socket.emit('join', {
          token: token,
          userId: data[0]._id,
        })
        navigation.navigate('ChatBox', { data, token, chat: res.data, user })
      })
  }

  return (
    <ScrollView
      style={styles.match}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <Text style={styles.title}>Tương hợp mới</Text>
      <ScrollView
        style={styles.newMatch}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {data?.map((item, index) => (
          <ChatAvatar
            key={index}
            name={item.full_name || item.username}
            avatar={item.avatar}
            onPress={handleOnPress}
          />
        ))}
      </ScrollView>
      <Text style={styles.title}>Tin nhắn</Text>
      {/* <ScrollView style={styles.chatList} showsVerticalScrollIndicator={false}>
        <ChatLine name="hello" message="meow meow" />
        <ChatLine
          name="hello"
          message="meow meowmeow meowmeow meowmeow meowmeow meowmeow meowmeow meowmeow meowmeow meowmeow meowmeow meow"
        />
        <ChatLine name="hello" message="meow meow" />
        <ChatLine name="hello" message="meow meow" />
        <ChatLine name="hello" message="meow meow" />
        <ChatLine name="hello" message="meow meow" />
        <ChatLine name="hello" message="meow meow" />
        <ChatLine name="hello" message="meow meow" />
      </ScrollView> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
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
