import AsyncStorage from '@react-native-community/async-storage'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import LikedAvatar from '../app/components/Liked/LikedAvatar'
import { ChangeDataContext } from '../app/contexts/ChangeData'

function Liked() {
  const [data, setData] = useState([])
  const { isChanged } = useContext(ChangeDataContext)

  useEffect(async () => {
    const value = await AsyncStorage.getItem('user')
    const matched_list = JSON.parse(value).user_liked_you
    setData(matched_list)
  }, [isChanged])

  return (
    <ScrollView
      style={styles.liked}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
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
