import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Matching from './Matching'
import Navigation from '../components/Navigation'
import Profile from './Profile'
import InformationSetting from './InformationSetting'
import Setting from './Setting'
import Liked from './Liked'
import Chat from './Chat'

const Main = () => {
  const Tab = createMaterialTopTabNavigator()
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        swipeEnabled={false}
        tabBar={(props) => <Navigation {...props} />}
      >
        <Tab.Screen name="Matching" component={Matching} />
        <Tab.Screen name="Liked" component={Liked} />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
      <Tab.Screen name="Setting" component={Setting} />
      <Tab.Screen name="InformationSetting" component={InformationSetting} />
    </NavigationContainer>
  )
}
export default Main
