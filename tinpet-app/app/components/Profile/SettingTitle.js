import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'

function SettingTitle({ onPress, title }) {
  return (
    <View style={styles.titleView}>
      <Text style={styles.emptyTitle}></Text>
      <Text style={styles.titleCenter}>{title}</Text>
      <TouchableOpacity style={{ width: '33.33333%' }} onPress={onPress}>
        <Text style={styles.title}>Xong</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
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
})

export default SettingTitle
