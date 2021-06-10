import AsyncStorage from '@react-native-community/async-storage'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Avatar from '../components/Avatar'
import ProfileAction from '../components/ProfileAction'
import ProfileImages from '../components/ProfileImages'

function Profile({ navigation }) {
  const [data, setData] = useState([])
  useEffect(async () => {
    const value = await AsyncStorage.getItem('user')
    setData(JSON.parse(value))
  }, [])

  const handleOnPress = (type) => {
    if (type === '1') {
      navigation.navigate('Setting')
    }
    if (type === '3') {
      navigation.navigate('SettingInfo')
    }
  }

  return (
    <View style={styles.container} onPress={() => {}}>
      <ScrollView>
        <Avatar img={''} data={data} />
        <ProfileAction onPress={(type) => handleOnPress(type)} />
        <ProfileImages photos={data.photos} />
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
    paddingTop: 10,
    backgroundColor: '#FFF',
  },
})

export default Profile
