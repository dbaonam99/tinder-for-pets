import React, { useContext, useEffect, useState } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import AsyncStorage from '@react-native-community/async-storage'
import SettingTitle from '../app/components/Profile/SettingTitle'
import { ChangeDataContext } from '../app/contexts/ChangeData'

const Setting = ({ navigation }) => {
  const { isChanged, setIsChanged } = useContext(ChangeDataContext)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [errorText, setErrorText] = useState('')

  const handleOnPress = async () => {
    const token = await AsyncStorage.getItem('token')
    setErrorText('')
    setStatus('')
    setLoading(true)
    fetch('https://pets-tinder.herokuapp.com/api/user/change-password', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmNewPassword,
      }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        if (res.status === 1) {
          setStatus(res.message)
          setTimeout(() => {
            navigation.navigate('Setting')
          }, 1000)
          setLoading(false)
          setIsChanged(!isChanged)
        } else {
          setErrorText(res.message)
          setLoading(false)
        }
      })
  }

  return (
    <View
      style={{
        backgroundColor: '#fff',
        marginTop: getStatusBarHeight(),
      }}
    >
      <SettingTitle
        title={'Đổi mật khẩu'}
        onPress={() => {
          navigation.navigate('Setting')
        }}
      />
      <View style={styles.settingView}>
        <Text style={styles.titleSetting}></Text>
        <View style={styles.settingBox}>
          <View style={styles.settingItemBorder}>
            <Text style={styles.itemText}>Mật khẩu cũ</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Nhập mật khẩu cũ"
              placeholderTextColor="#666"
              autoCapitalize="none"
              onChangeText={(value) => {
                setOldPassword(value)
              }}
              value={oldPassword}
            />
          </View>
          <View style={styles.settingItemBorder}>
            <Text style={styles.itemText}>Mật khẩu mới</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Nhập mật khẩu mới"
              placeholderTextColor="#666"
              autoCapitalize="none"
              name="email"
              onChangeText={(event) => {
                setNewPassword(event)
              }}
              value={newPassword}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.itemText}>Xác nhận mật khẩu mới</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Xác nhận mật khẩu"
              placeholderTextColor="#666"
              autoCapitalize="none"
              name="email"
              onChangeText={(event) => {
                setConfirmNewPassword(event)
              }}
              value={confirmNewPassword}
            />
          </View>
        </View>
        <Text style={styles.noteText}>
          Sử dụng mật khẩu nhiều kí tự đặc biệt giúp tài khoản được bảo mật hơn
        </Text>
        <Text style={styles.titleSetting}></Text>
        <TouchableOpacity style={styles.settingBox} onPress={handleOnPress}>
          <View style={styles.settingItem}>
            {loading ? (
              <ActivityIndicator
                size={35}
                color="#000"
                style={styles.loading}
              />
            ) : (
              <Text
                style={{
                  fontSize: 17,
                  lineHeight: 50,
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                Đổi mật khẩu
              </Text>
            )}
            <Text style={styles.status}>{status}</Text>
            <Text style={styles.error}>{errorText}</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.titleSetting}></Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  settingView: {
    width: '100%',
    minHeight: '100%',
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
  loading: {
    position: 'absolute',
    textAlign: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  status: {
    position: 'absolute',
    textAlign: 'center',
    bottom: -50,
    left: 0,
    right: 0,
    fontSize: 14,
    marginVertical: 10,
    color: 'green',
  },
  error: {
    position: 'absolute',
    textAlign: 'center',
    bottom: -50,
    left: 0,
    right: 0,
    fontSize: 14,
    marginVertical: 10,
    color: 'red',
  },
})

export default Setting
