import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity } from 'react-native';
import InfiniteScroll from 'react-infinite-scroll-component';
import Colors from '../../constants/Colors';
import { MonoText } from '../StyledText';
import { Text, View } from '../Themed';
import { useState, useRef, useEffect } from 'react';
import ChatInput from './ChatInput';

export default function Chatbot({ path, height}: { path: string, height: number }) {
  const fixedHeight = height / 100 * 90;
  const [id, setId] = useState(4);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([
    {
        id: 1,
        text: "Hello World! I'm Bitcoin Knowledge Bot",
        name: "Bot"
    },
    {
        id: 2,
        text: "I can answer most of your Bitcoin questions, but rembmember I'm just a chatbot so I might say something incorrect 'Dont trust, verify' and read the knowledge sources on your own and use your discernment",
        name: "Bot"
    },
    {
        id: 3,
        text: "What can I answer for you?",
        name: "Bot"
    }
  ])

  const handleOnSubmit = (e: Event) => {
    e.preventDefault();
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
      <View style={styles.chatbotContainer}>
          <InfiniteScroll
              dataLength={3} //This is important field to render the next data
              height={fixedHeight}
              loader={<h4>Loading...</h4>}
              next={() => null}
              hasMore={false}
          >
              {messages.map((message, index) => {
                  return (
                      message.name === 'Bot'
                      ?
                          <View key={index} style={styles.botTextContainer}>
                              <MonoText style={styles.nameText}>Bot:</MonoText>
                              <MonoText>{message.text}</MonoText>
                          </View>
                      :
                          <View key={index} style={styles.userTextContainer}>
                                  <MonoText style={styles.nameText}>User:</MonoText>
                                  <MonoText>{message.text}</MonoText>
                          </View>
                  )
              })}
          </InfiniteScroll>
          <ChatInput />
      </View>
  );
}

const styles = StyleSheet.create({
  chatbotContainer: {
    width: '50%',
    backgroundColor: '#708090',
    borderWidth: 4,
    borderRightColor: '#F2A900',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 5,
    alignItems: 'center',
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  scrollComponentStyles: {
    borderWidth: 4,
    borderTopColor: 'white',
  },
  botTextContainer: {
    maxWidth: '45%',
    minWidth: '5%',
    justifyContent: 'flex-start',
    borderWidth: 4,
    borderColor: '#F2A900',
    borderRadius: 10,
    padding: 7,
    margin: 7,
  },
  userTextContainer: {
    maxWidth: '45%',
    minWidth: '5%',
    justifyContent: 'flex-end',
    borderWidth: 4,
    borderColor: '#F2A900',
    borderRadius: 10,
    padding: 7,
    margin: 7,
  },
  nameText: {
    fontSize: 15,
    marginBottom: 7,
  },
});