import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Avatar from '../components/Avatar'
import ProfileAction from '../components/ProfileAction'
import ProfileImages from '../components/ProfileImages'

function Profile({ navigation }) {
  return (
    <View style={styles.container} onPress={() => {}}>
      <ScrollView>
        <Avatar />
        <ProfileAction navigation={navigation} />
        <ProfileImages />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'scroll',
    alignItems: 'center',
    width: '100%',
    minHeight: '100%',
    paddingVertical: 10,
    backgroundColor: '#FFF',
  },
})

export default Profile
