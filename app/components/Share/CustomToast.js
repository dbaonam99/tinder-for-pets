import React from 'react'
import { View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-gradient-icon'

export default function CustomToast({ text1, text2 }) {
  console.log(text1)
  return (
    <LinearGradient
      colors={['#fe5f51', '#fe5f75']}
      style={{
        height: 80,
        width: '100%',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        zIndex: 99999,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
      }}
    >
      <View>
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
            marginRight: 20,
          }}
        />
      </View>
      {text2 && (
        <View>
          <Text
            style={{
              marginVertical: 5,
              color: '#FFF',
              fontWeight: 'bold',
              fontSize: 15,
            }}
          >
            {text1}
          </Text>
          <Text style={{ marginVertical: 5, color: '#FFF' }}>{text2}</Text>
        </View>
      )}
    </LinearGradient>
  )
}
