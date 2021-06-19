import AsyncStorage from '@react-native-community/async-storage'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import MatchingAction from '../app/components/MatchingAction'
import SwipeCard from '../app/components/SwipeCard'
import { ChangeDataContext } from '../app/contexts/ChangeData'

function Matching({ navigation }) {
  const [data, setData] = useState({})
  const { isChanged, setIsChanged } = useContext(ChangeDataContext)

  useEffect(async () => {
    const value = await AsyncStorage.getItem('user')
    setData(JSON.parse(value))
  }, [isChanged])

  return (
    <View style={styles.container} onPress={() => {}}>
      <SwipeCard />
      <MatchingAction />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#FFF',
  },
})

export default Matching
