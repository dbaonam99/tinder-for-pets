import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-gradient-icon'
import LinearGradient from 'react-native-linear-gradient'

function ProfileAction({ navigation }) {
  return (
    <View style={styles.action}>
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => navigation.navigate('setting')}
      >
        <View style={styles.actionIcon}>
          <Icon
            size={29}
            type="ionicon"
            name="settings"
            color="#a5a5a5"
            style={{
              alignSelf: 'center',
            }}
          />
        </View>
        <Text style={styles.actionText}>Thiết lập</Text>
      </TouchableOpacity>
      <View style={styles.actionBtn}>
        <LinearGradient
          colors={['#fe5f75', '#fc9842']}
          style={styles.mediaIcon}
        >
          <Icon
            size={30}
            type="ionicon"
            name="camera"
            color="#fff"
            style={{
              alignSelf: 'center',
            }}
          />
        </LinearGradient>
        <Text style={styles.actionText}>Thêm media</Text>
      </View>
      <View style={styles.actionBtn}>
        <View style={styles.actionIcon}>
          <Icon
            size={29}
            type="ionicon"
            name="pencil"
            color="#a5a5a5"
            style={{
              alignSelf: 'center',
            }}
          />
        </View>
        <Text style={styles.actionText}>sửa thông tin</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  action: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    marginVertical: 20,
  },
  actionBtn: {
    width: '33.333333%',
    alignItems: 'center',
  },
  mediaIcon: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 90,
    borderRadius: 100,
    marginBottom: 10,
  },
  actionIcon: {
    backgroundColor: 'white',
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 70,
    height: 70,
    borderRadius: 100,

    shadowColor: '#677',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.32,
    shadowRadius: 10.46,
  },
  actionText: {
    color: '#999',
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: 12,
  },
})

export default ProfileAction
