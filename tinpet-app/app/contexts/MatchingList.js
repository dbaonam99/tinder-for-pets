import React, { useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { ChangeDataContext } from './ChangeData'

export const MatchingListContext = React.createContext()

export function MatchingListProvider(props) {
  const { isChanged, setIsChanged } = useContext(ChangeDataContext)
  const updateMatchingList = async () => {
    const token = await AsyncStorage.getItem('token')
    fetch(`https://pets-tinder.herokuapp.com/api/user/can-matching-list`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        await AsyncStorage.setItem('canMatchingList', JSON.stringify(res.data))
        setIsChanged(!isChanged)
        console.log('Matching updated!')
      })
  }

  return (
    <MatchingListContext.Provider
      value={{
        updateMatchingList,
      }}
    >
      {props.children}
    </MatchingListContext.Provider>
  )
}
