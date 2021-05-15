import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Icon } from 'react-native-gradient-icon'

const icons = ['logo-firebase', 'heart', 'chatbubble', 'person']

const Navigation = ({ state, descriptors, navigation }) => {
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
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name
        const name = icons[index]

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
                size={30}
                type="ionicons"
                name="flame"
                colors={
                  isFocused
                    ? [
                        {
                          color: 'rgba(52,161,251,1)',
                          offset: '0',
                          opacity: '1',
                        },
                        {
                          color: 'rgba(52,68,251,1)',
                          offset: '1',
                          opacity: '1',
                        },
                      ]
                    : [{ color: '#DDD', offset: '1', opacity: '1' }]
                }
              />
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default Navigation
