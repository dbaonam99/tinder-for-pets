import React, { useState } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Slider from '@react-native-community/slider'
import AsyncStorage from '@react-native-community/async-storage'
import SettingTitle from '../app/components/SettingTitle'

const Setting = ({ navigation }) => {
  const [range, setRange] = useState(0)
  return (
    <View
      style={{
        backgroundColor: '#fff',
        marginTop: getStatusBarHeight(),
      }}
    >
      <SettingTitle
        title={'Thiết lập'}
        onPress={() => navigation.navigate('Main')}
      />
      <View style={styles.settingView}>
        <Text style={styles.titleSetting}>Thiết lập tài khoản</Text>
        <View style={styles.settingBox}>
          <View style={styles.settingItemBorder}>
            <Text style={styles.itemText}>Số điện thoại</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="0948147259"
              placeholderTextColor="#666"
              autoCapitalize="none"
              // onChangeText={this.handleEmail}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.itemText}>Email</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="dbaonam99@gmail.com"
              placeholderTextColor="#666"
              autoCapitalize="none"
              // onChangeText={this.handleEmail}
            />
          </View>
        </View>
        <Text style={styles.noteText}>
          Số điện thoại và Email đã xác minh giúp bảo mật tài khoản của bạn
        </Text>
        <Text style={styles.titleSetting}>Khám phá</Text>
        <View style={styles.settingBox}>
          <View style={styles.settingItemBorderRange}>
            <Text style={styles.itemText}>Phạm vi tối đa</Text>
            <Text style={styles.itemTextRange}>{Math.round(range)} km</Text>
            <Slider
              style={styles.inputRange}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#fe1c15"
              maximumTrackTintColor="#ddd"
              onValueChange={(value) => setRange(value)}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.itemText}>Giới tính hiển thị</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Đực"
              placeholderTextColor="#666"
              autoCapitalize="none"
              // onChangeText={this.handleEmail}
            />
          </View>
        </View>
        <Text style={styles.titleSetting}>Pháp lý</Text>
        <View style={styles.settingBox}>
          <View style={styles.settingItemBorder}>
            <Text style={styles.itemText}>Chính sách và quyền riêng tư</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.itemText}>Giấy phép</Text>
          </View>
        </View>
        <Text style={styles.titleSetting}></Text>
        <TouchableOpacity
          style={styles.settingBox}
          onPress={async () => {
            navigation.navigate('Login')
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('user')
          }}
        >
          <View style={styles.settingItemBorder}>
            <Text
              style={{
                fontSize: 17,
                lineHeight: 50,
                textAlign: 'center',
                width: '100%',
              }}
            >
              Đăng xuất
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
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

export default Setting
