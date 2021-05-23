import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Main from './screens/Main'
import Login from './screens/Login'

const Stack = createStackNavigator()

const App = () => {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

// import React from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
// import Matching from './screens/Matching'
// import Navigation from './components/Navigation'
// import Profile from './screens//Profile'
// import InformationSetting from './screens//InformationSetting'
// import Setting from './screens//Setting'
// import Liked from './screens//Liked'
// import Chat from './screens//Chat'

// const App = () => {
//   const Tab = createMaterialTopTabNavigator()
//   return (
//     <NavigationContainer independent={true}>
//       <Tab.Navigator
//         swipeEnabled={false}
//         tabBar={(props) => <Navigation {...props} />}
//       >
//         <Tab.Screen name="Matching" component={Matching} />
//         <Tab.Screen name="Liked" component={Liked} />
//         <Tab.Screen name="Chat" component={Chat} />
//         <Tab.Screen name="Profile" component={Profile} />
//       </Tab.Navigator>
//       <Tab.Screen name="Setting" component={Setting} />
//       <Tab.Screen name="InformationSetting" component={InformationSetting} />
//     </NavigationContainer>
//   )
// }
// export default App
