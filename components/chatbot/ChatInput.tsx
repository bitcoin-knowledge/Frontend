import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TextInput, Pressable } from 'react-native';
import Colors from '../../constants/Colors';
import { MonoText } from '../StyledText';
import { Text, View } from '../Themed';
import { useState } from 'react';

export default function ChatInput({messages, newMessage, id, setId, setMessages, setNewMessage} : {messages: any, id: any, setId: any, newMessage: any, setMessages: any, setNewMessage: any}) {
  const [text, onChangeText] = useState('');

  const handleOnSubmit = (event: Event) => {
    event.preventDefault();
    // create user message from prompt
    setId(id + 1)
    const userMessage = {
      id: id,
      text: newMessage,
      name: "User"
    }
    // add user message to messages
    setTimeout(() => {
      setMessages([...messages, userMessage])
    }, 1000)
    // Clear input field
    setNewMessage('');
  }

  return (
    <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={onChangeText} value={text} placeholder='Type your message here...' />
        <Pressable style={styles.button} onPress={() => console.log('send')}>
            <MonoText style={styles.buttonText}>send</MonoText>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '75%',
    flexDirection: 'row',
    borderWidth: 2,
    padding: 10,
    alignItems: 'center',
    borderColor: '#F2A900',
    borderRadius: 15,
  },
  input: {
    width: '99%',
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 15,
  },
  button: {
    width: '10%',
    padding: 5,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#F2A900',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});
