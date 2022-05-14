import { StyleSheet } from 'react-native';
import axios from 'axios';
import { MonoText } from '../components/StyledText';
import Chatbot from '../components/chatbot/Chatbot';
import ArticleSuggestion from '../components/knowledge/ArticleSuggestion';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useEffect, useState } from 'react';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [botStatus, setBotStatus] = useState<string>('Loading...');
  const [height, setHeight] = useState(0);
  useEffect(() => {
    axios.get("https://bitcoin-knowledge-bot.herokuapp.com/")
    .then(response => {
        setBotStatus(response.data)
        pingChatbot()
    })
    .catch(error => {
        console.log(error)
    })
},[]);

const pingChatbot = () => {
  axios.get("https://bitcoin-knowledge-bot.herokuapp.com/ping")
}

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <MonoText style={styles.title}>Knowledge Bot</MonoText>
        <View style={styles.statusContainer}>
            <MonoText>Status:</MonoText>
            <MonoText style={botStatus === 'Loading...' ? styles.statusText : styles.statusTextConnected}>{botStatus}</MonoText>
        </View>
        <MonoText style={styles.subTitle}>A question & answer AI bot that also suggests articles/podcasts {"\n"} Powered by GPT-3 and trained on an open source dataset of established Bitcoin knowledge</MonoText>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
      <View style={styles.knowledgeContainer} onLayout={(event) => {
      const {height} = event.nativeEvent.layout;
        setHeight(height);
      }}>
        <Chatbot path='/screens/TabOneScreen.tsx' height={height}/>
        <ArticleSuggestion />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusContainer: {
    width: '25%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 15,
    textAlign: 'center',
  },
  statusText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'red',
    textDecorationLine: 'underline',
  },
  statusTextConnected: {
    fontSize: 15,
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#39ff14',
  },
  separator: {
    marginVertical: 10,
    height: 2,
    width: '150%',
  },
  knowledgeContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    padding: 2,
  },
});
