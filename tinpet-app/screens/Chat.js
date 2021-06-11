import React from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
import ChatAvatar from '../app/components/ChatAvatar'
import ChatLine from '../app/components/ChatLine'

function Chat() {
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
        <ChatAvatar name="hello" />
        <ChatAvatar name="hello" />
        <ChatAvatar name="hello" />
        <ChatAvatar name="hello" />
        <ChatAvatar name="hello" />
        <ChatAvatar name="hello" />
        <ChatAvatar name="hello" />
        <ChatAvatar name="hello" />
      </ScrollView>
      <Text style={styles.title}>Tin nhắn</Text>
      <ScrollView style={styles.chatList} showsVerticalScrollIndicator={false}>
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
      </ScrollView>
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
