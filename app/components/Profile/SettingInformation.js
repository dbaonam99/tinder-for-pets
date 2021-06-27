import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
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

function SettingInformation({ fullName, bio, onChange, hobby }) {
  const [hobbies, setHobbies] = useState([])
  const [userHobbies, setUserHobbies] = useState([])
  const [selectValue, setSelectValue] = useState('')

  useEffect(async () => {
    const token = await AsyncStorage.getItem('token')
    fetch(`https://pets-tinder.herokuapp.com/api/hobby`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        setHobbies(
          res.data.map((item) => {
            return {
              label: item.name,
              value: item._id,
            }
          })
        )
      })
  }, [])

  useEffect(() => {
    const arr = []
    for (let i in hobbies) {
      for (let j in hobby) {
        if (hobbies[i].value === hobby[j]) {
          arr.push(hobbies[i])
        }
      }
    }
    setUserHobbies(arr)
  }, [hobby, hobbies])

  return (
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
            onChangeText={(value) => onChange('fullName', value)}
            value={fullName}
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
            onChangeText={(value) => onChange('bio', value)}
            value={bio}
          />
        </View>
      </View>
      <Text style={styles.titleSetting}>SỞ THÍCH</Text>
      <View style={styles.settingBox}>
        <View style={styles.settingItem}>
          <RNPickerSelect
            style={pickerStyle}
            onValueChange={(value) => setSelectValue(value)}
            onDonePress={() => onChange('hobby', selectValue)}
            items={hobbies}
            value={selectValue}
          />
        </View>
      </View>
      <View style={styles.hobbies}>
        {userHobbies?.map((item) => (
          <LinearGradient
            colors={['#fe5f75', '#fc9842']}
            style={styles.hobby}
            key={item.value}
          >
            <TouchableOpacity
              onPress={() => onChange('hobbyDelete', item.value)}
            >
              <Text style={styles.hobbyText}>{item.label}</Text>
            </TouchableOpacity>
          </LinearGradient>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    fontSize: 16,
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
  settingBox: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    height: 50,
  },
  hobbies: {
    width: '100%',
    marginBottom: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hobby: {
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  hobbyText: {
    color: '#FFF',
    fontSize: 16,
  },
})

export default SettingInformation
