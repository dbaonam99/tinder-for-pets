import AsyncStorage from '@react-native-community/async-storage'
import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import LinearGradient from 'react-native-linear-gradient'
import AppIntroSlider from 'react-native-app-intro-slider'

const slides = [
  {
    key: 'one',
    title: 'Chú mèo của bạn đang cô đơn?',
    text: 'Hãy tìm cho nó một bạn tình',
    image: require('../assets/img/intro2.jpg'),
  },
  {
    key: 'two',
    title: 'Tìm đối tượng thích hợp cho thú cưng của bạn',
    text: 'Rất nhiều những chú cún dễ thương',
    image: require('../assets/img/intro1.jpg'),
  },
  {
    key: 'three',
    title: 'Giúp thú cưng sinh ra những đứa con dễ thương',
    text: 'Match ngay, chần chừ gì nữa!',
    image: require('../assets/img/intro3.jpg'),
  },
]

const img = require('../assets/img/logo.png')

const Login = ({ navigation }) => {
  const [showRealApp, setShowRealApp] = useState(false)
  const [location, setLocation] = useState({})

  useEffect(async () => {
    const value = await AsyncStorage.getItem('token')
    const showIntro = await AsyncStorage.getItem('showIntro')
    if (showIntro) {
      setShowRealApp(true)
    }
    if (value) {
      navigation.navigate('Main')
    }
  }, [])

  useEffect(() => {
    Geolocation.getCurrentPosition(async (info) => {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${info.coords.latitude}&lon=${info.coords.longitude}`,
        {
          method: 'GET',
        }
      )
        .then((response) => response.json())
        .then(async (res) => {
          setLocation({
            lat: info.coords.latitude,
            lng: info.coords.longitude,
            address: `${res.address.city}, ${res.address.state}`,
          })
        })
    })
  }, [])

  const _renderItem = ({ item }) => {
    return (
      <LinearGradient colors={['#fe5f51', '#fe5f75']} style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.imageIntro} />
        <Text style={styles.text}>{item.text}</Text>
      </LinearGradient>
    )
  }

  const _onDone = async () => {
    setShowRealApp(true)
  }

  const _renderNextButton = () => {
    return (
      <View style={styles.nextTextBox}>
        <Text style={styles.nextText}>Tiếp theo</Text>
      </View>
    )
  }

  const _renderDoneButton = () => {
    return (
      <View style={styles.nextTextBox}>
        <Text style={styles.nextText}>Xong</Text>
      </View>
    )
  }

  if (showRealApp) {
    return (
      <View>
        <LinearGradient colors={['#fe5f51', '#fe5f75']} style={styles.login}>
          <View style={styles.logo}>
            <ImageBackground source={img} style={styles.image} />
            <Text style={styles.logoText}>tinpet</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignUp', { location })}
          >
            <Text style={styles.buttonText}>LẬP TÀI KHOẢN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => navigation.navigate('SignIn', { location })}
          >
            <Text style={styles.buttonText2}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    )
  } else {
    return (
      <AppIntroSlider
        renderItem={_renderItem}
        data={slides}
        onDone={_onDone}
        renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
      />
    )
  }
}
const styles = StyleSheet.create({
  nextTextBox: {
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  nextText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '600',
  },
  login: {
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  logo: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logoText: {
    fontSize: 56,
    color: '#FFF',
    fontWeight: 'bold',
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  button: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 50,
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  buttonText: {
    fontWeight: '500',
    color: '#555',
  },
  button2: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  buttonText2: {
    fontWeight: '500',
    color: '#fff',
  },

  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIntro: {
    width: '90%',
    height: 500,
    marginVertical: 32,
    borderRadius: 20,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  title: {
    width: '80%',
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
})
export default Login
