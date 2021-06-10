import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'

function ProfileImages({ photos }) {
  return (
    <View style={styles.images}>
      {photos?.map((item, index) => (
        <View style={styles.imageContainer} key={index}>
          <ImageBackground source={item} style={styles.image} />
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  images: {
    marginTop: 70,
    padding: 8,
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
