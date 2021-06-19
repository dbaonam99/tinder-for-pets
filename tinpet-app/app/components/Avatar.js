import React, { useContext, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { Icon } from 'react-native-gradient-icon'
import ImagePicker from 'react-native-image-crop-picker'
import { ChangeDataContext } from '../contexts/ChangeData'

const defaultImg = require('../../assets/img/dinesh.jpg')

function Avatar({ data }) {
  const [loading, setLoading] = useState(false)
  const { isChanged, setIsChanged } = useContext(ChangeDataContext)
  const handleOnPress = async () => {
    const token = await AsyncStorage.getItem('token')
    const images = await ImagePicker.openPicker({
      multiple: true,
    })
    const data = new FormData()
    data.append('avatar', {
      uri: Platform.OS === 'ios' ? `file:///${images[0].path}` : images[0].path,
      type: 'image/jpeg',
      name: 'image.jpg',
    })
    setLoading(true)
    fetch('https://pets-tinder.herokuapp.com/api/user/upload-avatar', {
      method: 'POST',
      body: data,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        await AsyncStorage.setItem('user', JSON.stringify(res.data))
        setLoading(false)
        setIsChanged(!isChanged)
      })
  }

  return (
    <View style={styles.avatar}>
      <TouchableOpacity onPress={handleOnPress}>
        {loading && (
          <ActivityIndicator size={35} color="#fff" style={styles.loading} />
        )}
        <ImageBackground
          source={data.avatar ? { uri: data.avatar } : defaultImg}
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.name}>{data?.username}</Text>
        <Text style={styles.smallInfo}>{data?.address}</Text>
        <Text style={styles.icon}>
          <Icon size={25} type="material" name="verified" color="#0c70ff" />
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 20,
  },
  loading: {
    position: 'absolute',
    zIndex: 999,
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    width: 150,
    height: 150,
    borderRadius: 200,
  },
  image: {
    borderRadius: 200,
    overflow: 'hidden',
    width: 150,
    height: 150,
    position: 'relative',
  },
  info: {
    justifyContent: 'center',
  },
  name: {
    position: 'relative',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  smallInfo: {
    marginTop: 5,
    fontSize: 13,
    textAlign: 'center',
    color: '#777',
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    top: 25,
    right: -35,
  },
})

export default Avatar
