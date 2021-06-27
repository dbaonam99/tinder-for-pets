import React from 'react'
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'

const img = require('../../../assets/img/dinesh.jpg')

function ChatAvatar({ name, avatar, onPress }) {
  return (
    <TouchableOpacity style={styles.avatar} onPress={onPress}>
      <ImageBackground
        source={avatar ? { uri: avatar } : img}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
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
