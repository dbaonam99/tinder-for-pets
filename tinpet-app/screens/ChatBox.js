import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import React, { useEffect, useState, useRef } from 'react'
import ChatBoxTitle from '../app/components/Chat/ChatBoxTitle'
import ChatInput from '../app/components/Chat/ChatInput'
import socketIOClient from 'socket.io-client'

const ENDPOINT = 'https://pets-tinder.herokuapp.com'

const ChatBox = ({ navigation, route }) => {
  const socket = socketIOClient(ENDPOINT)
  const scrollView = useRef()
  const { data, token, chat, user } = route.params
  const [chatList, setChatList] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setChatList(chat)
  }, [chat])

  useEffect(() => {
    socket.emit('join', {
      token: token,
      userIds: [data._id],
    })
    socket.on('send-message-response', (data) => {
      setMessage('')
      setLoading(false)
      setChatList((prevState) => [...prevState, data.data])
    })
  }, [])

  const handleOnPress = () => {
    setLoading(true)
    socket.emit('join', {
      token: token,
      userIds: [data._id],
    })
    socket.emit('send-message', {
      token: token,
      userId: data._id,
      message: message,
    })
  }

  return (
    <View
      style={{
        backgroundColor: '#fff',
        marginTop: getStatusBarHeight(),
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ChatBoxTitle
        title={'Sửa thông tin'}
        onPress={() => navigation.navigate('Chat')}
        avatar={data[0]?.avatar}
        name={data[0]?.full_name}
      />
      <ScrollView
        style={styles.chatBox}
        ref={scrollView}
        onContentSizeChange={() =>
          scrollView.current.scrollToEnd({ animated: true })
        }
      >
        <View style={{ paddingBottom: 20 }}>
          {chatList?.map((item, index) => {
            const isUserSending = item.user_post._id === user._id
            return (
              <View key={index} style={styles.chat}>
                <Text
                  style={isUserSending ? styles.chatRight : styles.chatLeft}
                >
                  {item.message}
                </Text>
              </View>
            )
          })}
        </View>
      </ScrollView>
      <ChatInput
        loading={loading}
        message={message}
        onPress={handleOnPress}
        onChange={(value) => setMessage(value)}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  chatBox: {
    height: '79%',
    width: '100%',
  },
  chat: {
    height: 40,
    marginVertical: 5,
    width: '100%',
    padding: 10,
  },
  chatRight: {
    textAlign: 'right',
    height: 40,
    alignSelf: 'flex-end',
    backgroundColor: '#26a0fe',
    borderRadius: 15,
    overflow: 'hidden',
    minWidth: 50,
    textAlign: 'center',
    lineHeight: 40,
    paddingHorizontal: 10,
    color: '#FFF',
  },
  chatLeft: {
    textAlign: 'left',
    height: 40,
    alignSelf: 'flex-start',
    backgroundColor: '#dfdfe0',
    borderRadius: 15,
    minWidth: 60,
    overflow: 'hidden',
    textAlign: 'center',
    lineHeight: 40,
    paddingHorizontal: 10,
    color: '#000',
  },
})

export default ChatBox
