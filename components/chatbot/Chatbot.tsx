import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, FlatList, SafeAreaView, ScrollView } from 'react-native';
import ReactLoading from 'react-loading';
import { Message } from "../../types" 
import { MonoText } from '../StyledText';
import { Text, View } from '../Themed';
import { useState, useRef, useEffect } from 'react';
import ChatInput from './ChatInput';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { UPDATE_ID, SET_NEW_MESSAGE, UPDATE_ARTICLES, SET_LOADING } from '../../store/Actions';

export default function Chatbot({ path, height}: { path: string, height: number }) {
  const dispatch = useDispatch();
  const messages = useSelector((state: any) => state.ChatbotReducer.messages);
  const loading = useSelector((state: any) => state.ChatbotReducer.loading);
  const id = useSelector((state: any) => state.ChatbotReducer.id);
  const bottomListRef: any = useRef();

  const formatChatLog = () => {
    let chatLog = ''
    messages.map((message: any) => {
      // Skip over the bot greeting
      if (message.id > 3) {
        chatLog += `${message.name}: ${message.text}\n\n###\n\n`
      }
      return null
    })
    return chatLog
  }

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.name === 'User') {
      dispatch({ type: SET_LOADING, payload: true });
      const log = formatChatLog()
      axios.post("https://bitcoin-knowledge-bot.herokuapp.com/ask", {chat_log: log})
      .then(response => {
        console.log(response)
        setTimeout(() => {
          dispatch({ type: UPDATE_ID, payload: id + 1 });
          dispatch({ type: SET_NEW_MESSAGE, payload: { id: messages.length + 1, text: response.data.answer, name: 'Bot' } });
          dispatch({ type: UPDATE_ARTICLES, payload: response.data.articles });
          dispatch({ type: SET_LOADING, payload: false });
          // Now autoscroll to the bottom of the list
          bottomListRef.current.scrollToEnd({animated: true});
        }, 3000)
      })
      .catch(error => {
          console.log(error)
      })
    }
  }, [messages])

  const renderData = ({ item }: any) => {
    return(
      item.name === 'Bot' ?
        <View style={styles.botTextContainer}>
          <MonoText style={styles.nameText}>Bot: </MonoText>
          <MonoText>{item.text}</MonoText>
        </View>
        :
        <View style={styles.userTextContainer}>
          <MonoText style={styles.nameText}>User: </MonoText>
          <MonoText>{item.text}</MonoText>
        </View>
    )
  }

  return (
      <SafeAreaView style={styles.chatbotContainer}>
        <ScrollView style={styles.scroll} ref={bottomListRef}>
          <FlatList
            data={messages}
            renderItem={renderData}
            keyExtractor={(item: Message) => item.id.toString()}
          />
          {loading ?
          <View style={styles.chatBubbles}>
            <ReactLoading type={'bubbles'} color={"#F2A900"} height={"10%"} width={"10%"} />
          </View>
          : null}
        </ScrollView>
          <ChatInput />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chatbotContainer: {
    display: 'flex',
    width: '50%',
    height: '87%',
    backgroundColor: 'black',
    borderWidth: 4,
    borderRightColor: '#F2A900',
    borderTopColor: '#F2A900',
    borderLeftColor: '#F2A900',
    borderBottomColor: '#F2A900',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    alignItems: 'center',
  },
  chatbotList: {
    width: '100%',
    height: '100%',
  },
  scroll: {
    height: '100%',
    marginBottom: 5,
    backgroundColor: '#708090',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
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
  messageContainer: {
    width: '100%',
    display: 'flex',
    backgroundColor: '#708090',
  },
  botTextContainer: {
    maxWidth: '55%',
    minWidth: '5%',
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderColor: '#F2A900',
    borderRadius: 10,
    padding: 10,
    margin: 7,
  },
  userTextContainer: {
    maxWidth: '55%',
    minWidth: '5%',
    alignSelf: 'flex-end',
    borderWidth: 2,
    borderColor: '#F2A900',
    borderRadius: 10,
    padding: 10,
    margin: 7,
  },
  nameText: {
    fontSize: 15,
    marginBottom: 7,
  },
  chatBubbles: {
    backgroundColor: 'transparent',
    paddingLeft: '1%'
  }
});
