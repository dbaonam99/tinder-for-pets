import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Icon } from 'react-native-gradient-icon'

const Navigation = ({ state, descriptors, navigation }) => {
  const icons = [
    { name: 'flame', type: 'ionicon' },
    { name: 'star-sharp', type: 'ionicon' },
    { name: 'md-chatbubbles-sharp', type: 'ionicon' },
    { name: 'person', type: 'ionicon' },
    { name: 'person', type: 'ionicon' },
  ]
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
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default Navigation
