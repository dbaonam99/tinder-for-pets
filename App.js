import React, { useContext, useEffect, useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import socketIOClient from 'socket.io-client'
import { ChangeDataProvider } from './app/contexts/ChangeData'
import {
  MatchingListContext,
  MatchingListProvider,
} from './app/contexts/MatchingList'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import SplashScreen from 'react-native-splash-screen'
import Matching from './screens/Matching'
import Navigation from './app/components/Share/Navigation'
import Profile from './screens/Profile'
import Liked from './screens/Liked'
import Chat from './screens/Chat'
import Login from './screens/Login'
import Setting from './screens/Setting'
import SettingInfo from './screens/SettingInfo'
import SignUp from './screens/SignUp'
import SignIn from './screens/SignIn'
import ChatBox from './screens/ChatBox'
import ChangePassword from './screens/ChangePassword'
import AsyncStorage from '@react-native-community/async-storage'
import { TouchableOpacity, View, Text, Alert } from 'react-native'

const Stack = createStackNavigator()
const Tab = createMaterialTopTabNavigator()
const ENDPOINT = 'https://pets-tinder.herokuapp.com'

const Main = () => {
  const socket = socketIOClient(ENDPOINT)
  const { setMatchingList } = useContext(MatchingListContext)

  useEffect(() => {
    PushNotificationIOS.addEventListener('register')
    PushNotificationIOS.addEventListener('notification')
    PushNotificationIOS.addEventListener('localNotification')

    PushNotificationIOS.requestPermissions().then(
      (data) => {
        console.log('PushNotificationIOS.requestPermissions', data)
      },
      (data) => {
        console.log('PushNotificationIOS.requestPermissions failed', data)
      }
    )

    return () => {
      PushNotificationIOS.removeEventListener('register')
      PushNotificationIOS.removeEventListener('registrationError')
      PushNotificationIOS.removeEventListener('notification')
      PushNotificationIOS.removeEventListener('localNotification')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sendLocalNotification = () => {
    setTimeout(() => {
      PushNotificationIOS.presentLocalNotification({
        alertTitle: 'Sample Title',
        alertBody: 'Sample local notification',
        applicationIconBadgeNumber: 0,
      })
    }, 5000)
  }

  return (
    // <View>
    //   <TouchableOpacity onPress={sendLocalNotification}>
    //     <Text>asdasd</Text>
    //     <Text>asdasd</Text>
    //     <Text>asdasd</Text>
    //     <Text>asdasd</Text>
    //     <Text>asdasd</Text>
    //     <Text>asdasd</Text>
    //     <Text>asdasd</Text>
    //     <Text>asdasd</Text>
    //   </TouchableOpacity>
    <Tab.Navigator
      swipeEnabled={false}
      tabBar={(props) => <Navigation {...props} />}
    >
      <Tab.Screen name="Matching" component={Matching} />
      <Tab.Screen name="Liked" component={Liked} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
    // </View>
  )
}

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <ChangeDataProvider>
      <MatchingListProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerStyle: { elevation: 0 },
              cardStyle: { backgroundColor: '#FFF' },
            }}
          >
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={Main}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="Setting"
              component={Setting}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SettingInfo"
              component={SettingInfo}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChatBox"
              component={ChatBox}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MatchingListProvider>
    </ChangeDataProvider>
  )
}

export default App
