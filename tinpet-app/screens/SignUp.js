import * as React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import LinearGradient from 'react-native-linear-gradient'

const img = require('../assets/img/logo.png')

const Login = ({ navigation }) => {
  const [userName, setUserName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [status, setStatus] = React.useState([])
  const [confirmPassword, setConfirmPassword] = React.useState('')

  const handleOnPress = async () => {
    fetch('https://pets-tinder.herokuapp.com/api/user/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userName,
        password: password,
        confirmPassword: confirmPassword,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status === 1) {
          setStatus([res.message, true])
          setTimeout(() => {
            navigation.navigate('SignIn')
          }, 1000)
        } else {
          setStatus([res.message, false])
        }
      })
  }

  const handleOnChangeUserName = (value) => {
    setUserName(value)
  }

  const handleOnChangePassword = (value) => {
    setPassword(value)
  }

  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }

  return (
    <View>
      <TouchableOpacity
        style={styles.titleView}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.title}>Trở về</Text>
      </TouchableOpacity>
      <LinearGradient colors={['#fe5f51', '#fe5f75']} style={styles.login}>
        <View style={styles.logo}>
          <ImageBackground source={img} style={styles.image} />
          <Text style={styles.logoText}>tinpet</Text>
        </View>
        <View style={styles.errorBox}>
          <Text style={styles.error}>{status[0]}</Text>
        </View>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Tên đăng nhập"
          placeholderTextColor="#666"
          autoCapitalize="none"
          value={userName}
          onChangeText={(value) => handleOnChangeUserName(value)}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Mật khẩu"
          placeholderTextColor="#666"
          autoCapitalize="none"
          value={password}
          onChangeText={(value) => handleOnChangePassword(value)}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Nhập lại mật khẩu"
          placeholderTextColor="#666"
          autoCapitalize="none"
          value={confirmPassword}
          onChangeText={(value) => handleOnChangeConfirmPassword(value)}
        />
        <TouchableOpacity style={styles.button2} onPress={handleOnPress}>
          <Text style={styles.buttonText2}>ĐĂNG KÝ</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  )
}
const styles = StyleSheet.create({
  errorBox: {
    width: '90%',
    height: 30,
    position: 'absolute',
    bottom: 180,
    borderRadius: 50,
  },
  error: {
    width: '100%',
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700',
  },
  titleView: {
    position: 'absolute',
    top: getStatusBarHeight(),
    left: 0,
    height: 50,
    width: '100%',
    zIndex: 99999,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    textAlign: 'left',
    lineHeight: 50,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  login: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
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
  input: {
    width: '90%',
    backgroundColor: '#FFF',
    height: 50,
    marginBottom: 25,
    borderRadius: 50,
    paddingHorizontal: 20,
  },
  button2: {
    width: '90%',
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