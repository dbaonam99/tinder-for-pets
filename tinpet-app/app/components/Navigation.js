import React, { useContext, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { ChangeDataContext } from '../../app/contexts/ChangeData'
import { Icon } from 'react-native-gradient-icon'
import AsyncStorage from '@react-native-community/async-storage'

const icons = [
  { name: 'flame', type: 'ionicon' },
  { name: 'star-sharp', type: 'ionicon' },
  { name: 'md-chatbubbles-sharp', type: 'ionicon' },
  { name: 'person', type: 'ionicon' },
  { name: 'person', type: 'ionicon' },
]

const Navigation = ({ state, navigation }) => {
  const [likedLength, setLikedLength] = useState([])
  const { isChanged } = useContext(ChangeDataContext)

  useEffect(async () => {
    const value = await AsyncStorage.getItem('user')
    const matched_list = JSON.parse(value).matched_list
    setLikedLength(matched_list.length)
  }, [isChanged])

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: getStatusBarHeight(),
      }}
    >
      {state.routes.map((route, index) => {
        const name = icons[index].name
        const type = icons[index].type
        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          })
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <View>
              <Icon
                size={29}
                type={type}
                name={name}
                colors={
                  isFocused
                    ? [
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
                      ]
                    : [{ color: '#a5a5a5', offset: '1', opacity: '1' }]
                }
              />
              {index === 1 && (
                <Text style={styles.likedLength}>{likedLength}</Text>
              )}
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  likedLength: {
    backgroundColor: '#f0c16c',
    position: 'absolute',
    top: -11,
    right: -9,
    width: 20,
    height: 20,
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 20,
    borderRadius: 10,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
})

export default Navigation
