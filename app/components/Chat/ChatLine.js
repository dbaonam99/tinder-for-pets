import React from 'react'
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { Icon } from 'react-native-gradient-icon'

const img = require('../../../assets/img/dinesh.jpg')

function ChatLine({ name, message, onPress, isUserSending, isSeen, avatar }) {
  return (
    <TouchableOpacity style={styles.avatar} onPress={onPress}>
      <ImageBackground
        source={avatar ? { uri: avatar } : img}
        style={styles.image}
      />
      <View style={styles.chatInfo}>
        <Text style={styles.name}>{name}</Text>
        {isUserSending ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon
              size={14}
              type="ionicon"
              name="arrow-undo"
              color="#a5a5a5"
              style={{
                alignSelf: 'center',
                marginTop: 5,
                marginRight: 5,
              }}
            />
            <Text style={styles.messageSeen}>{message}</Text>
          </View>
        ) : isSeen ? (
          <Text style={styles.messageSeen}>{message}</Text>
        ) : (
          <Text style={styles.message}>{message}</Text>
        )}
        {!isSeen && !isUserSending && <View style={styles.seenDot} />}
      </View>
    </TouchableOpacity>
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
  messageSeen: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  message: {
    marginTop: 10,
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  seenDot: {
    position: 'absolute',
    right: 0,
    top: 20,
    width: 15,
    height: 15,
    backgroundColor: '#2d8ff3',
    borderRadius: 50,
  },
})

export default ChatLine
