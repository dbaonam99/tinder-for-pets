import React from 'react'
import { StyleSheet, View } from 'react-native'
import MatchingAction from '../app/components/MatchingAction'
import SwipeCard from '../app/components/SwipeCard'

function Matching({ navigation }) {
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
