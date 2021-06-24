import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { ScrollView } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import SettingTitle from '../app/components/Profile/SettingTitle'
import SettingImages from '../app/components/Profile/SettingImages'
import SettingInformation from '../app/components/Profile/SettingInformation'
import { ChangeDataContext } from '../app/contexts/ChangeData'

const SettingInfo = ({ navigation }) => {
  const { isChanged, setIsChanged } = useContext(ChangeDataContext)
  const [photos, setPhotos] = useState([])
  const [fullName, setFullName] = useState('')
  const [bio, setBio] = useState('')
  const [hobby, setHobby] = useState([])

  useEffect(async () => {
    const value = await AsyncStorage.getItem('user')
    const photos = JSON.parse(value).photos
    if (photos.length < 9) {
      const missing = 9 - photos.length
      for (let i = 0; i < missing; i++) {
        photos.push('')
      }
    }
    const data = JSON.parse(value)
    setPhotos(photos)
    setFullName(data.full_name && data.full_name)
    setBio(data.bio && data.bio)
    setHobby(data.hobbies.length > 0 ? data.hobbies : [])
  }, [isChanged])

  const handleOnPress = async () => {
    navigation.navigate('Main')
    const token = await AsyncStorage.getItem('token')
    const data = {
      full_name: fullName,
      bio,
      hobbies: hobby,
    }
    fetch('https://pets-tinder.herokuapp.com/api/user/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(async (res) => {
        if (res.status === 1) {
          await AsyncStorage.setItem('user', JSON.stringify(res.data))
          setIsChanged(!isChanged)
        } else {
          setStatus(res.message)
        }
      })
  }

  const handleOnChange = (name, value) => {
    if (name === 'fullName') {
      setFullName(value)
    }
    if (name === 'bio') {
      setBio(value)
    }
    if (name === 'hobby') {
      const hobbyArr = [...hobby]
      hobbyArr.push(value)
      setHobby(
        hobbyArr.filter(function (item, pos) {
          return hobbyArr.indexOf(item) == pos
        })
      )
    }
    if (name === 'hobbyDelete') {
      const hobbyArr = [...hobby]
      setHobby(hobbyArr.filter((item) => item !== value))
    }
  }

  return (
    <ScrollView
      style={{
        backgroundColor: '#fff',
        marginTop: getStatusBarHeight(),
      }}
    >
      <SettingTitle title={'Sửa thông tin'} onPress={handleOnPress} />
      <SettingImages photos={photos} />
      <SettingInformation
        fullName={fullName}
        bio={bio}
        hobby={hobby}
        onChange={(name, value) => handleOnChange(name, value)}
      />
    </ScrollView>
  )
}

export default SettingInfo
