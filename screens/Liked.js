import AsyncStorage from '@react-native-community/async-storage'
import React, { useContext, useEffect, useState } from 'react'
import socketIOClient from 'socket.io-client'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import LikedAvatar from '../app/components/Liked/LikedAvatar'
import { ChangeDataContext } from '../app/contexts/ChangeData'
import { MatchingListContext } from '../app/contexts/MatchingList'
import CustomToast from '../app/components/Share/CustomToast'
import Toast from 'react-native-toast-message'

const ENDPOINT = 'https://pets-tinder.herokuapp.com'

function Liked() {
  const { matchingList, setMatchingList } = useContext(MatchingListContext)
  const [data, setData] = useState([])
  const socket = socketIOClient(ENDPOINT)
  const { isChanged } = useContext(ChangeDataContext)

  useEffect(async () => {
    const value = await AsyncStorage.getItem('user')
    const matched_list = JSON.parse(value).user_liked_you
    setData(matched_list)
  }, [isChanged])

  useEffect(() => {
    const asyncFunc = async () => {
      const token = await AsyncStorage.getItem('token')
      const matchingListId = matchingList.map((item) => item._id)
      socket.emit('join', {
        token: token,
        userIds: matchingListId,
      })
      socket.on('send-message-response', async (data) => {
        console.log('send-message-response')
        setMatchingList(data.matching_list)
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Có người đã gửi tin nhắn cho bạn 👋',
          text2: 'Cùng trò truyện ngay nào!',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 0,
          bottomOffset: 40,
        })
      })
    }
    asyncFunc()
  }, [isChanged])

  const toastConfig = {
    success: ({ text1, text2, props, ...rest }) => (
      <CustomToast text1={text1} text2={text2} />
    ),
  }

  return (
    <ScrollView
      style={styles.liked}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <Toast ref={(ref) => Toast.setRef(ref)} config={toastConfig} />
      <View style={styles.likedCount}>
        <Text style={styles.likedCountText}>{data.length} lượt thích</Text>
      </View>
      <View style={styles.likedListTitle}>
        <Text style={styles.likedListTitleText}>
          Cập nhật tính năng VIP để xem ai đã ngỏ ý thích bạn
        </Text>
      </View>
      <View style={styles.likedList} showsVerticalScrollIndicator={false}>
        {data?.map((item, index) => {
          console.log(item)
          return (
            <LikedAvatar
              margin={index % 2 === 0 && true}
              key={index}
              avatar={item.avatar}
            />
          )
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  liked: {
    backgroundColor: '#FFF',
    minHeight: '100%',
  },
  newMatch: {
    flexDirection: 'row',
    overflow: 'scroll',
    height: 110,
  },
  likedCount: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    lineHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  likedCountText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  likedList: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginLeft: 8,
  },
  likedListTitle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likedListTitleText: {
    textAlign: 'center',
    width: '70%',
    color: '#666',
    fontWeight: 'bold',
    marginVertical: 20,
  },
})

export default Liked
