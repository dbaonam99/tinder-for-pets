import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import LinearGradient from 'react-native-linear-gradient'
import RNPickerSelect from 'react-native-picker-select'

const pickerStyle = {
  inputIOS: {
    width: '90%',
    backgroundColor: '#FFF',
    height: 50,
    marginBottom: 25,
    borderRadius: 50,
    marginLeft: 20,
    paddingHorizontal: 20,
  },
  placeholder: {
    color: '#747474',
  },
}

const img = require('../assets/img/logo.png')

const Login = ({ navigation, route }) => {
  const { location } = route.params
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [fullName, setFullName] = useState('')
  const [status, setStatus] = useState([])
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleOnPress = async () => {
    setLoading(true)
    fetch('https://pets-tinder.herokuapp.com/api/user/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: fullName,
        username: userName,
        password,
        gender,
        confirmPassword,
        address: location.address,
        lat: location.lat,
        lng: location.lng,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status === 1) {
          setStatus([res.message, true])
          setTimeout(() => {
            navigation.navigate('SignIn', { location })
          }, 1000)
          setLoading(false)
        } else {
          setLoading(false)
          setStatus([res.message, false])
        }
      })
  }

  return (
    <View>
      <TouchableOpacity
        style={styles.titleView}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.title}>Tr??? v???</Text>
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
          placeholder="T??n ????ng nh???p"
          placeholderTextColor="#666"
          autoCapitalize="none"
          value={userName}
          onChangeText={(value) => setUserName(value)}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="T??n hi???n th???"
          placeholderTextColor="#666"
          autoCapitalize="none"
          value={fullName}
          onChangeText={(value) => setFullName(value)}
        />
        <RNPickerSelect
          placeholder={{
            label: 'L???a ch???n gi???i t??nh...',
            value: null,
          }}
          style={pickerStyle}
          onValueChange={(value) => {
            setGender(value)
          }}
          value={gender}
          items={[
            { label: 'Lo??i ?????c', value: 1 },
            { label: 'Lo??i c??i', value: 0 },
          ]}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="M???t kh???u"
          placeholderTextColor="#666"
          autoCapitalize="none"
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Nh???p l???i m???t kh???u"
          placeholderTextColor="#666"
          autoCapitalize="none"
          value={confirmPassword}
          onChangeText={(value) => setConfirmPassword(value)}
        />
        <TouchableOpacity style={styles.button2} onPress={handleOnPress}>
          {loading ? (
            <ActivityIndicator size={35} color="#fff" />
          ) : (
            <Text style={styles.buttonText2}>????NG K??</Text>
          )}
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
    bottom: 110,
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
    marginBottom: 50,
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
