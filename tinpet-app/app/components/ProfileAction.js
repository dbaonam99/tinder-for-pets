import React, { useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import ImagePicker from 'react-native-image-crop-picker'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native'
import { Icon } from 'react-native-gradient-icon'
import LinearGradient from 'react-native-linear-gradient'

function ProfileAction({ onPress }) {
  const [loading, setLoading] = useState(false)
  const handleOnAddMedia = async () => {
    setLoading(true)
    const token = await AsyncStorage.getItem('token')
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
        onPress('2')
        setLoading(false)
      })
  }

  return (
    <View style={styles.action}>
      <TouchableOpacity style={styles.actionBtn} onPress={() => onPress('1')}>
        <View style={styles.actionIcon}>
          <Icon
            size={29}
            type="ionicon"
            name="settings"
            color="#a5a5a5"
            style={{
              alignSelf: 'center',
            }}
          />
        </View>
        <Text style={styles.actionText}>Thiết lập</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionBtn} onPress={handleOnAddMedia}>
        <LinearGradient
          colors={['#fe5f75', '#fc9842']}
          style={styles.mediaIcon}
        >
          {loading ? (
            <ActivityIndicator size={35} color="#fff" />
          ) : (
            <Icon
              size={30}
              type="ionicon"
              name="camera"
              color="#fff"
              style={{
                alignSelf: 'center',
              }}
            />
          )}
        </LinearGradient>
        <Text style={styles.actionText}>Thêm media</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionBtn} onPress={() => onPress('3')}>
        <View style={styles.actionIcon}>
          <Icon
            size={29}
            type="ionicon"
            name="pencil"
            color="#a5a5a5"
            style={{
              alignSelf: 'center',
            }}
          />
        </View>
        <Text style={styles.actionText}>sửa thông tin</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 5,
  },
  action: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    marginVertical: 20,
  },
  actionBtn: {
    width: '33.333333%',
    alignItems: 'center',
  },
  mediaIcon: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 90,
    borderRadius: 100,
    marginBottom: 10,
  },
  actionIcon: {
    backgroundColor: 'white',
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 70,
    height: 70,
    borderRadius: 100,

    shadowColor: '#677',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.32,
    shadowRadius: 10.46,
  },
  actionText: {
    color: '#999',
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: 12,
  },
})

export default ProfileAction
