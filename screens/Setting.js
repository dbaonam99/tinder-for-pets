import React, { useContext, useEffect, useState } from 'react'
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Slider from '@react-native-community/slider'
import AsyncStorage from '@react-native-community/async-storage'
import SettingTitle from '../app/components/Profile/SettingTitle'
import { ChangeDataContext } from '../app/contexts/ChangeData'
import { MatchingListContext } from '../app/contexts/MatchingList'
import RNPickerSelect from 'react-native-picker-select'
import { Icon } from 'react-native-gradient-icon'
import LinearGradient from 'react-native-linear-gradient'

const pickerStyle = {
  inputIOS: {
    paddingTop: 14,
    paddingHorizontal: 10,
    paddingBottom: 12,
    fontSize: 17,
    color: '#666',
  },
  inputAndroid: {
    color: 'white',
  },
  underline: { borderTopWidth: 0 },
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 20,
    right: 15,
  },
}

const Setting = ({ navigation }) => {
  const { isChanged, setIsChanged } = useContext(ChangeDataContext)
  const { updateMatchingList } = useContext(MatchingListContext)
  const [area, setArea] = useState(0)
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')

  useEffect(async () => {
    const value = await AsyncStorage.getItem('user')
    const data = JSON.parse(value)
    setArea(data.area && data.area)
    setPhone(data.phone && data.phone)
    setEmail(data.email && data.email)
    setGender(data.gender && data.gender)
  }, [isChanged])

  const handleOnPress = async () => {
    navigation.navigate('Main')
    const token = await AsyncStorage.getItem('token')
    const data = {
      phone,
      email,
      area,
      gender,
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
          updateMatchingList()
        }
      })
  }

  return (
    <ScrollView
      style={{
        backgroundColor: '#fff',
        marginTop: getStatusBarHeight(),
      }}
    >
      <SettingTitle title={'Thi???t l???p'} onPress={handleOnPress} />
      <View style={styles.settingView}>
        <View style={styles.vip}>
          <View style={styles.vipBox}>
            <Icon
              size={26}
              type={'ionicon'}
              name={'flame'}
              style={styles.icon}
              colors={[
                {
                  color: '#fc9842',
                  offset: '1',
                  opacity: '1',
                },
                {
                  color: '#fe5f75',
                  offset: '0',
                  opacity: '1',
                },
              ]}
            />
            <Text style={styles.logoText}>tinpet</Text>
            <LinearGradient
              style={styles.vipIcon}
              colors={['#fe5f75', '#fc9842']}
            >
              <Text style={styles.vipIconText}>vip</Text>
            </LinearGradient>
            <Text style={styles.vipText}>
              Xem ai Th??ch b???n & nhi???u th??? kh??c
            </Text>
          </View>
        </View>
        <Text style={styles.titleSetting}>Thi???t l???p t??i kho???n</Text>
        <View style={styles.settingBox}>
          <View style={styles.settingItemBorder}>
            <Text style={styles.itemText}>S??? ??i???n tho???i</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Nh???p s??? ??i???n tho???i"
              placeholderTextColor="#666"
              autoCapitalize="none"
              onChangeText={(value) => {
                setPhone(value)
              }}
              value={phone}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.itemText}>Email</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Nh???p email"
              placeholderTextColor="#666"
              autoCapitalize="none"
              name="email"
              onChangeText={(event) => {
                setEmail(event)
              }}
              value={email}
            />
          </View>
        </View>
        <Text style={styles.noteText}>
          S??? ??i???n tho???i v?? Email ???? x??c minh gi??p b???o m???t t??i kho???n c???a b???n
        </Text>
        <Text style={styles.titleSetting}>Kh??m ph??</Text>
        <View style={styles.settingBox}>
          <View style={styles.settingItemBorderRange}>
            <Text style={styles.itemText}>Ph???m vi t???i ??a</Text>
            <Text style={styles.itemTextRange}>{Math.round(area)} km</Text>
            <Slider
              style={styles.inputRange}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#fe1c15"
              maximumTrackTintColor="#ddd"
              onValueChange={(value) => {
                setArea(value)
              }}
              value={area}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.itemText}>Gi???i t??nh hi???n th???</Text>
            <RNPickerSelect
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
          </View>
        </View>
        <Text style={styles.titleSetting}>Ph??p l??</Text>
        <View style={styles.settingBox}>
          <View style={styles.settingItemBorder}>
            <Text style={styles.itemText}>Ch??nh s??ch v?? quy???n ri??ng t??</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.itemText}>Gi???y ph??p</Text>
          </View>
        </View>
        <Text style={styles.titleSetting}></Text>
        <TouchableOpacity
          style={styles.settingBox}
          onPress={async () => {
            navigation.navigate('ChangePassword')
          }}
        >
          <View style={styles.settingItem}>
            <Text
              style={{
                fontSize: 17,
                lineHeight: 50,
                textAlign: 'center',
                width: '100%',
              }}
            >
              ?????i m???t kh???u
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingBox}
          onPress={async () => {
            navigation.navigate('Login')
            await AsyncStorage.setItem('showIntro', JSON.stringify(false))
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('user')
          }}
        >
          <View style={styles.settingItem}>
            <Text
              style={{
                fontSize: 17,
                lineHeight: 50,
                textAlign: 'center',
                width: '100%',
              }}
            >
              ????ng xu???t
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.titleSetting}></Text>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  settingView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#efedf3',
  },
  vip: {
    width: '100%',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  vipBox: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    padding: 20,
    borderRadius: 10,
    overflow: 'hidden',
    flexWrap: 'wrap',
  },
  icon: {
    marginTop: 5,
  },
  vipIcon: {
    width: 35,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginLeft: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  vipIconText: {
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  vipText: {
    color: '#999',
    fontWeight: 'bold',
    marginTop: 5,
    width: '100%',
    textAlign: 'center',
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
  select: {
    backgroundColor: 'red',
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

export default Setting
