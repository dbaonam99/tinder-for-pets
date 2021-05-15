import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Matching from './screens/Matching';
import Navigation from './components/Navigation';
import Chat from './screens/Chat';
import Profile from './screens/Profile';

const App = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <Navigation {...props} />}>
        <Tab.Screen name="Matching" component={Matching} />
        <Tab.Screen name="Liked" component={Chat} />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App