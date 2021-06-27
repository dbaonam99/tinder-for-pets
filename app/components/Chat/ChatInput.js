import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'

function ChatInput({ message, onPress, onChange, loading }) {
  return (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Nhập tin nhắn"
        placeholderTextColor="#666"
        autoCapitalize="none"
        value={message}
        onChangeText={(value) => onChange(value)}
      />
      <TouchableOpacity onPress={onPress} style={styles.sendMessageButton}>
        {loading ? (
          <ActivityIndicator size={30} color="#000" style={styles.loading} />
        ) : (
          <Text style={styles.sendMessage}>Gửi</Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  inputBox: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  sendMessageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 30,
    bottom: 15,
  },
  sendMessage: {
    fontSize: 18,
    color: '#aaa',
  },
  loading: {
    position: 'absolute',
    bottom: -5,
    right: 0,
  },
})

export default ChatInput
