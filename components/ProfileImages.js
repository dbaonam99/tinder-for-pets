import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-gradient-icon'

const img = require('../assets/img/dinesh.jpg')

function ProfileImages() {
  return (
    <View style={styles.images}>
      <View style={styles.imageContainer}>
        <ImageBackground source={img} style={styles.image} />
      </View>
      <View style={styles.imageContainer}>
        <ImageBackground source={img} style={styles.image} />
      </View>
      <View style={styles.imageContainer}>
        <ImageBackground source={img} style={styles.image} />
      </View>
      <View style={styles.imageContainer}>
        <ImageBackground source={img} style={styles.image} />
      </View>
      <View style={styles.imageContainer}>
        <ImageBackground source={img} style={styles.image} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  images: {
    marginTop: 70,
    padding: 20,
    paddingBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imageContainer: {
    width: '100%',
    maxHeight: 400,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

export default ProfileImages
