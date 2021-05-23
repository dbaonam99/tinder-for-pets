import React from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import LikedAvatar from '../components/LikedAvatar'

const data = [
  {
    id: '1',
  },
  {
    id: '2',
  },
  {
    id: '3',
  },
  {
    id: '4',
  },
  {
    id: '5',
  },
  {
    id: '6',
  },
  {
    id: '7',
  },
  {
    id: '8',
  },
]

function Liked() {
  return (
    <ScrollView
      style={styles.liked}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.likedCount}>
        <Text style={styles.likedCountText}>9 lượt thích</Text>
      </View>
      <View style={styles.likedListTitle}>
        <Text style={styles.likedListTitleText}>
          Cập nhật tính năng VIP để xem ai đã ngỏ ý thích bạn
        </Text>
      </View>
      <View style={styles.likedList} showsVerticalScrollIndicator={false}>
        {data.map((item, index) => {
          return <LikedAvatar key={item.id} margin={index % 2 === 0 && true} />
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
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
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
