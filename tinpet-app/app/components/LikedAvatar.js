import React from 'react'
import { ImageBackground, StyleSheet, View, Dimensions } from 'react-native'

const img = require('../../assets/img/dinesh.jpg')

function LikedAvatar({ margin }) {
  return (
    <View
      style={{
        ...styles.avatar,
        marginRight: margin ? 8 : 0,
      }}
    >
      <ImageBackground source={img} style={styles.image} blurRadius={20} />
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: Dimensions.get('window').width / 2 - 12,
    marginBottom: 8,
  },
  'avatar:first-child': {
    borderColor: 'blue',
    borderTopWidth: 3,
  },
  image: {
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    height: 250,
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

export default LikedAvatar
