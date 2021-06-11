import React from 'react'
import { ImageBackground, StyleSheet, View, Text } from 'react-native'

const img = require('../../assets/img/dinesh.jpg')

function ChatAvatar({ name }) {
  return (
    <View style={styles.avatar}>
      <ImageBackground source={img} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 75,
    height: 100,
    margin: 8,
  },
  image: {
    borderRadius: 200,
    overflow: 'hidden',
    width: 75,
    height: 75,
  },
  info: {
    justifyContent: 'center',
  },
  name: {
    position: 'relative',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
    textAlign: 'center',
  },
})

export default ChatAvatar
