import React, { useState, useContext } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  ActivityIndicator,
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import AsyncStorage from '@react-native-community/async-storage'
import { ChangeDataContext } from '../../../app/contexts/ChangeData'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-gradient-icon'

function SettingImages({ photos }) {
  const { isChanged, setIsChanged } = useContext(ChangeDataContext)
  const [loading, setLoading] = useState()

  const handleOnAddMedia = async (item, index) => {
    const token = await AsyncStorage.getItem('token')
    if (item) {
      setLoading(index)
      fetch('https://pets-tinder.herokuapp.com/api/user/delete-photo', {
        method: 'POST',
        body: JSON.stringify({
          photo: item,
        }),
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then(async (res) => {
          await AsyncStorage.setItem('user', JSON.stringify(res.data))
          setLoading(null)
          setIsChanged(!isChanged)
        })
    } else {
      const images = await ImagePicker.openPicker({
        multiple: true,
      })
      const data = new FormData()
      images.forEach((image) => {
        data.append('photos', {
          uri: Platform.OS === 'ios' ? `file:///${image.path}` : image.path,
          type: 'image/jpeg',
          name: 'image.jpg',
        })
      })
      setLoading(index)
      fetch('https://pets-tinder.herokuapp.com/api/user/upload-photos', {
        method: 'POST',
        body: data,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((response) => response.json())
        .then(async (res) => {
          await AsyncStorage.setItem('user', JSON.stringify(res.data))
          setLoading(null)
          setIsChanged(!isChanged)
        })
    }
  }

  return (
    <View style={styles.imageGrid}>
      {photos?.map((item, index) => {
        return (
          <View style={styles.imageItem} key={index}>
            <ImageBackground
              source={{
                uri: item
                  ? item
                  : 'https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png',
              }}
              style={styles.image}
            />
            {loading === index && (
              <ActivityIndicator
                size={35}
                color="#fff"
                style={styles.loading}
              />
            )}
            <TouchableOpacity onPress={() => handleOnAddMedia(item, index)}>
              <LinearGradient
                colors={item ? ['#FFF', '#FFF'] : ['#fe5f75', '#fc9842']}
                style={item ? styles.button : styles.buttonRemove}
              >
                <Icon
                  size={20}
                  type="material"
                  style={styles.icon}
                  name={item ? 'remove' : 'add'}
                  color={item ? '#fe1c15' : '#fff'}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  loading: {
    width: '100%',
    height: '100%',
  },

  button: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#FFF',
    width: 28,
    height: 28,
    zIndex: 999,
  },
  buttonRemove: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#fe1c15',
    width: 28,
    height: 28,
  },
  icon: {
    marginLeft: 4,
  },
  imageGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: '#efedf3',
    paddingVertical: 15,
  },
  imageItem: {
    width: '28.8%',
    height: 140,
    backgroundColor: '#DDDCE5',
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 10,
    position: 'relative',
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 10,
    overflow: 'hidden',
    resizeMode: 'contain',
  },
})

export default SettingImages
