import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function ProfileAction() {
  return (
    <View style={styles.action}>
      <View style={styles.actionBtn}>
        <View style={styles.actionIcon}>
          <Text>icon</Text>
        </View>
        <Text style={styles.actionText}>Thiết lập</Text>
      </View>
      <View style={styles.actionBtn}>
        <View style={styles.mediaIcon}>
          <Text>icon</Text>
        </View>
        <Text style={styles.actionText}>Thêm media</Text>
      </View>
      <View style={styles.actionBtn}>
        <View style={styles.actionIcon}>
          <Text>icon</Text>
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
    borderColor: 'rgba(52,68,251,1)',
    borderWidth: 2,
    borderRadius: 100,
    shadowColor: 'rgba(52,68,251,1)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.54,
    shadowRadius: 10.32,
    elevation: 16,
    marginBottom: 10,
    backgroundColor: 'rgba(52,68,251,1)',
  },
  actionIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderColor: '#DDD',
    borderWidth: 2,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.54,
    shadowRadius: 10.32,
    elevation: 16,
    marginBottom: 10,
  },
  actionText: {
    color: '#999',
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: 12,
  },
})

export default ProfileAction
