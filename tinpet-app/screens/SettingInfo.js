import React from 'react'
import { Icon } from 'react-native-gradient-icon'
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const img = require('../assets/img/logo.png')

const SettingInfo = ({ navigation }) => {
  return (
    <ScrollView
      style={{
        backgroundColor: '#fff',
        marginTop: getStatusBarHeight(),
      }}
    >
      <View style={styles.titleView}>
        <Text style={styles.emptyTitle}></Text>
        <Text style={styles.titleCenter}>Sửa thông tin</Text>
        <TouchableOpacity
          style={{ width: '33.33333%' }}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.title}>Xong</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageGrid}>
        <View style={styles.imageItem}>
          <ImageBackground source={img} style={styles.image} />
          <TouchableOpacity style={styles.button}>
            <Icon
              size={20}
              type="material"
              style={styles.icon}
              name="remove"
              color="#fe1c15"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.imageItem}>
          <ImageBackground source={img} style={styles.image} />
          <TouchableOpacity style={styles.button}>
            <Icon
              size={20}
              type="material"
              style={styles.icon}
              name="remove"
              color="#fe1c15"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.imageItem}>
          <ImageBackground source={img} style={styles.image} />
          <TouchableOpacity style={styles.button}>
            <Icon
              size={20}
              type="material"
              style={styles.icon}
              name="remove"
              color="#fe1c15"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.imageItem}>
          <ImageBackground source={img} style={styles.image} />
          <TouchableOpacity style={styles.button}>
            <Icon
              size={20}
              type="material"
              style={styles.icon}
              name="remove"
              color="#fe1c15"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.imageItem}>
          <ImageBackground source={img} style={styles.image} />
          <LinearGradient
            colors={['#fe5f75', '#fc9842']}
            style={styles.buttonRemove}
          >
            <Icon
              size={20}
              type="material"
              style={styles.icon}
              name="add"
              color="#fff"
            />
          </LinearGradient>
        </View>
        <View style={styles.imageItem}>
          <ImageBackground source={img} style={styles.image} />
          <LinearGradient
            colors={['#fe5f75', '#fc9842']}
            style={styles.buttonRemove}
          >
            <Icon
              size={20}
              type="material"
              style={styles.icon}
              name="add"
              color="#fff"
            />
          </LinearGradient>
        </View>
        <View style={styles.imageItem}>
          <ImageBackground source={img} style={styles.image} />
          <LinearGradient
            colors={['#fe5f75', '#fc9842']}
            style={styles.buttonRemove}
          >
            <Icon
              size={20}
              type="material"
              style={styles.icon}
              name="add"
              color="#fff"
            />
          </LinearGradient>
        </View>
        <View style={styles.imageItem}>
          <ImageBackground source={img} style={styles.image} />
          <LinearGradient
            colors={['#fe5f75', '#fc9842']}
            style={styles.buttonRemove}
          >
            <Icon
              size={20}
              type="material"
              style={styles.icon}
              name="add"
              color="#fff"
            />
          </LinearGradient>
        </View>
        <View style={styles.imageItem}>
          <ImageBackground source={img} style={styles.image} />
          <LinearGradient
            colors={['#fe5f75', '#fc9842']}
            style={styles.buttonRemove}
          >
            <Icon
              size={20}
              type="material"
              style={styles.icon}
              name="add"
              color="#fff"
            />
          </LinearGradient>
        </View>
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
  imageGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#efedf3',
  },
  imageItem: {
    width: '30.55%',
    height: 150,
    backgroundColor: '#DDDCE5',
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
    position: 'relative',
  },
  image: {},
  button: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#FFF',
    width: 28,
    height: 28,
  },
  buttonRemove: {
    position: 'absolute',
    bottom: -5,
    right: -5,
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
  titleView: {
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
  },
  emptyTitle: {
    width: '33.333333%',
  },
  title: {
    textAlign: 'right',
    lineHeight: 50,
    fontSize: 18,
    fontWeight: '600',
    color: '#fe1c15',
  },
  titleCenter: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 50,
    width: '33.333333%',
    textAlign: 'center',
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
