import React from 'react'
import { ImageBackground, StyleSheet, View, Text } from 'react-native'

const img = require('../../assets/img/dinesh.jpg')

function ChatLine({ name, message }) {
  return (
    <View style={styles.avatar}>
      <ImageBackground source={img} style={styles.image} />
      <View style={styles.chatInfo}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: '100%',
    flexDirection: 'row',
    height: 80,
    margin: 8,
  },
  image: {
    borderRadius: 200,
    overflow: 'hidden',
    width: 75,
    height: 75,
  },
  chatInfo: {
    height: 75,
    margin: 8,
    width: '70%',
    overflow: 'hidden',
    justifyContent: 'flex-start',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  message: {
    color: '#666',
    fontSize: 16,
  },
})

export default ChatLine
