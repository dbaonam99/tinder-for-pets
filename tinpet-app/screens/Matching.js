import AsyncStorage from '@react-native-community/async-storage'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import MatchingAction from '../app/components/Matching/MatchingAction'
import SwipeCard from '../app/components/Matching/SwipeCard'
import { ChangeDataContext } from '../app/contexts/ChangeData'

function Matching({ navigation }) {
  const [data, setData] = useState()
  const [token, setToken] = useState('')
  const { isChanged, setIsChanged } = useContext(ChangeDataContext)

  useEffect(async () => {
    const value = await AsyncStorage.getItem('user')
    const token = await AsyncStorage.getItem('token')
    setData(JSON.parse(value))
    setToken(token)
  }, [isChanged])

  return (
    <View style={styles.container} onPress={() => {}}>
      {data && <SwipeCard data={data.can_matching_list} token={token} />}
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
