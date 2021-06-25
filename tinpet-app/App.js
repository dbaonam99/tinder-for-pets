import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { ChangeDataProvider } from './app/contexts/ChangeData'
import AsyncStorage from '@react-native-community/async-storage'
import Geolocation from '@react-native-community/geolocation'
import SplashScreen from 'react-native-splash-screen'
import Matching from './screens/Matching'
import Navigation from './app/components/Navigation'
import Profile from './screens/Profile'
import Liked from './screens/Liked'
import Chat from './screens/Chat'
import Login from './screens/Login'
import Setting from './screens/Setting'
import SettingInfo from './screens/SettingInfo'
import SignUp from './screens/SignUp'
import SignIn from './screens/SignIn'
import ChatBox from './screens/ChatBox'
import Checkout from './screens/Checkout'

const Stack = createStackNavigator()
const Tab = createMaterialTopTabNavigator()

const Main = () => {
  return (
    <Tab.Navigator
      swipeEnabled={false}
      tabBar={(props) => <Navigation {...props} />}
    >
      <Tab.Screen name="Matching" component={Matching} />
      <Tab.Screen name="Liked" component={Liked} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  Geolocation.getCurrentPosition(async (info) => {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${info.coords.latitude}&lon=${info.coords.longitude}`,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then(async (res) => {
        await AsyncStorage.setItem(
          'location',
          JSON.stringify({
            city: res.address.city,
            state: res.address.state,
            county: res.address.county,
            country: res.address.country,
          })
        )
      })
  })

  return (
    <ChangeDataProvider>
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
            options={{ headerShown: false }}
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
            name="Checkout"
            component={Checkout}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ChangeDataProvider>
  )
}

export default App
