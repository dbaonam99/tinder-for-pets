import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-gradient-icon'

function MatchingAction({ onPress }) {
  return (
    <View style={styles.action}>
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => onPress('left')}
      >
        <View style={styles.actionIcon}>
          <Icon
            size={29}
            type="ionicon"
            name="close"
            colors={[
              {
                color: '#f85032',
                offset: '0',
                opacity: '1',
              },
              {
                color: '#e73827',
                offset: '1',
                opacity: '1',
              },
            ]}
            style={{
              alignSelf: 'center',
            }}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => onPress('right')}
      >
        <View style={styles.actionIcon}>
          <Icon
            size={29}
            type="ionicon"
            name="star"
            colors={[
              {
                color: '#82FEFA',
                offset: '0',
                opacity: '1',
              },
              {
                color: '#0ED2F7',
                offset: '1',
                opacity: '1',
              },
            ]}
            style={{
              alignSelf: 'center',
            }}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => onPress('right')}
      >
        <View style={styles.actionIcon}>
          <Icon
            size={29}
            type="ionicon"
            name="heart"
            colors={[
              {
                color: '#93F9B9',
                offset: '0',
                opacity: '1',
              },
              {
                color: '#11FFBD',
                offset: '1',
                opacity: '1',
              },
            ]}
            style={{
              alignSelf: 'center',
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  action: {
    height: 95,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
  },
  actionBtn: {
    width: '33.333333%',
    alignItems: 'center',
  },
  actionIcon: {
    backgroundColor: 'white',
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 60,
    height: 60,
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

export default MatchingAction
