import AsyncStorage from '@react-native-community/async-storage'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Avatar from '../app/components/Avatar'
import ProfileAction from '../app/components/ProfileAction'
import ProfileImages from '../app/components/ProfileImages'
import { ChangeDataContext } from '../app/contexts/ChangeData'

function Profile({ navigation }) {
  const [data, setData] = useState({})
  const { isChanged, setIsChanged } = useContext(ChangeDataContext)
  useEffect(async () => {
    const value = await AsyncStorage.getItem('user')
    setData(JSON.parse(value))
  }, [isChanged])

  const handleOnPress = (type) => {
    if (type === '1') {
      navigation.navigate('Setting')
    }
    if (type === '2') {
      setIsChanged()
    }
    if (type === '3') {
      navigation.navigate('SettingInfo')
    }
  }

  return (
    <View style={styles.container} onPress={() => {}}>
      <ScrollView>
        <Avatar data={data && data} />
        <ProfileAction onPress={(type) => handleOnPress(type)} />
        <ProfileImages photos={data?.photos} />
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
