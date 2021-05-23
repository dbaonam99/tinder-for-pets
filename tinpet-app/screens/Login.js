import * as React from 'react'
import {
  Button,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const img = require('../assets/img/logo.png')

const Login = ({ navigation }) => {
  return (
    <View>
      <LinearGradient colors={['#fe5f51', '#fe5f75']} style={styles.login}>
        <View style={styles.logo}>
          <ImageBackground source={img} style={styles.image} />
          <Text style={styles.logoText}>tinpet</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.buttonText}>LẬP TÀI KHOẢN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.buttonText2}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  )
}
const styles = StyleSheet.create({
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
})
export default Login
