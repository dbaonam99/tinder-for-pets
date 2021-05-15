import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'

const img = require('../assets/img/dinesh.jpg')

function Avatar() {
  return (
    <View style={styles.avatar}>
      <ImageBackground source={img} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>Dương Bảo Nam</Text>
        <Text style={styles.smallInfo}>Quận 2, Hồ Chí Minh</Text>
        <Text style={styles.icon}> ICON </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    borderRadius: 200,
    overflow: 'hidden',
    width: 150,
    height: 150,
  },
  info: {
    justifyContent: 'center',
  },
  name: {
    position: 'relative',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  smallInfo: {
    marginTop: 5,
    fontSize: 13,
    textAlign: 'center',
  },
  icon: {
    position: 'absolute',
    top: 20,
    right: -40,
  },
})

export default Avatar
