import React, { useContext, useEffect, useState } from 'react'
import ImagePicker from 'react-native-image-crop-picker'
import AsyncStorage from '@react-native-community/async-storage'
import { Icon } from 'react-native-gradient-icon'
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ActivityIndicator,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import SettingTitle from '../app/components/SettingTitle'
import { ChangeDataContext } from '../app/contexts/ChangeData'

const img = require('../../assets/img/logo.png')

const SettingInfo = ({ navigation }) => {
  const { isChanged, setIsChanged } = useContext(ChangeDataContext)
  const [data, setData] = useState({})
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState()

  useEffect(async () => {
    const value = await AsyncStorage.getItem('user')
    const photos = JSON.parse(value).photos
    if (photos.length < 9) {
      const missing = 9 - photos.length
      for (let i = 0; i < missing; i++) {
        photos.push('')
      }
    }
    setPhotos(photos)
    setData(JSON.parse(value))
  }, [isChanged])

  const handleOnAddMedia = async (item, index) => {
    if (item) {
      console.log(item)
    } else {
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
          setIsChanged()
        })
    }
  }

  return (
    <ScrollView
      style={{
        backgroundColor: '#fff',
        marginTop: getStatusBarHeight(),
      }}
    >
      <SettingTitle
        title={'Sửa thông tin'}
        onPress={() => navigation.navigate('Main')}
      />
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
      <View style={styles.settingView}>
        <Text style={styles.titleSetting}>TÊN HIỂN THỊ</Text>
        <View style={styles.settingBox}>
          <View style={styles.settingItem}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Tên"
              placeholderTextColor="#666"
              autoCapitalize="none"
              // onChangeText={this.handleEmail}
            />
          </View>
        </View>
        <Text style={styles.titleSetting}>ABOUT ME</Text>
        <View style={styles.settingBox}>
          <View style={styles.settingItem}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Giới thiệu bản thân"
              placeholderTextColor="#666"
              autoCapitalize="none"
              // onChangeText={this.handleEmail}
            />
          </View>
        </View>
        <Text style={styles.titleSetting}>SỞ THÍCH</Text>
        <View style={styles.settingBox}>
          <View style={styles.settingItem}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Sở thích"
              placeholderTextColor="#666"
              autoCapitalize="none"
              // onChangeText={this.handleEmail}
            />
          </View>
        </View>
        <Text style={styles.titleSetting}>Giới tính</Text>
        <View style={styles.settingBox}>
          <View style={styles.settingItem}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Sở thích"
              placeholderTextColor="#666"
              autoCapitalize="none"
              // onChangeText={this.handleEmail}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  loading: {
    width: '100%',
    height: '100%',
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
  button: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    backgroundColor: 'red',
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
    backgroundColor: 'red',
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
  settingView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#efedf3',
  },
  titleSetting: {
    fontSize: 15,
    color: '#666',
    marginHorizontal: 20,
    paddingVertical: 10,
    textTransform: 'uppercase',
  },
  input: {
    height: 50,
    fontSize: 16,
  },
  settingBox: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  settingItemBorder: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingItemBorderRange: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'center',
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  noteText: {
    color: '#666',
    fontSize: 13,
    marginHorizontal: 20,
    marginVertical: 10,
    marginTop: -10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    height: 50,
  },
  itemText: {
    fontSize: 17,
    lineHeight: 50,
  },
  itemTextRange: {
    height: 50,
    lineHeight: 50,
    textAlign: 'right',
    fontSize: 17,
    width: '50%',
    color: '#666',
  },
  inputRange: {
    width: '100%',
    height: 40,
  },
})

export default SettingInfo
