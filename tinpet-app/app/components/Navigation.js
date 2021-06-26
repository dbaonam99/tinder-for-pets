import React, { useContext, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import socketIOClient from 'socket.io-client'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { ChangeDataContext } from '../../app/contexts/ChangeData'
import { MatchingListContext } from '../../app/contexts/MatchingList'
import { Icon } from 'react-native-gradient-icon'
import AsyncStorage from '@react-native-community/async-storage'

const icons = [
  { name: 'flame', type: 'ionicon' },
  { name: 'star-sharp', type: 'ionicon' },
  { name: 'md-chatbubbles-sharp', type: 'ionicon' },
  { name: 'person', type: 'ionicon' },
  { name: 'person', type: 'ionicon' },
]
const ENDPOINT = 'https://pets-tinder.herokuapp.com'

const Navigation = ({ state, navigation }) => {
  const [likedLength, setLikedLength] = useState([])
  const socket = socketIOClient(ENDPOINT)
  const { updateMatchingList } = useContext(MatchingListContext)
  const { isChanged } = useContext(ChangeDataContext)

  useEffect(() => {
    socket.on('like-user-response', async (data) => {
      if (data.user_id) {
        setLikedLength(data.data.length)
      }
    })
  }, [])

  useEffect(async () => {
    const value = await AsyncStorage.getItem('user')
    const data = JSON.parse(value)
    console.log(data.user_liked_you.length)
    setLikedLength(data.user_liked_you.length)
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

        const onPress = async () => {
          if (route.name === 'Matching') {
            updateMatchingList()
          }
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
