import React from 'react'
import { StyleSheet, View } from 'react-native'
import Avatar from '../components/Avatar'
import ProfileAction from '../components/ProfileAction'

function Profile() {
  return (
    <View style={styles.container} onPress={() => {}}>
      <Avatar />
      <ProfileAction />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    minHeight: '100%',
    paddingVertical: 10,
    backgroundColor: '#FFF',
  },
})

export default Profile
