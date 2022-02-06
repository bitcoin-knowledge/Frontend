import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Chatbot from './Chatbot';
import ArticleSuggestion from './ArticleSuggestion';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { useState } from 'react';

export default function KnowledgeWindow({ path }: { path: string }) {
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
  return (
    <View>
      <View style={styles.knowledgeContainer}>
        <Chatbot path={path} messages={messages}/>
        <ArticleSuggestion path={path} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  knowledgeContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    padding: 2,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
