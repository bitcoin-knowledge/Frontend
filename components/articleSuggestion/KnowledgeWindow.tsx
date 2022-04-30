import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Chatbot from '../chatbot/Chatbot';
import ArticleSuggestion from './ArticleSuggestion';
import Colors from '../../constants/Colors';
import { MonoText } from '../StyledText';
import { Text, View } from '../Themed';
import { useState } from 'react';

export default function KnowledgeWindow({ path }: { path: string }) {
  const [height, setHeight] = useState(0);
  return (
    <View style={styles.knowledgeContainer} onLayout={(event) => {
      const {height} = event.nativeEvent.layout;
      setHeight(height);
    }}>
      <Chatbot path={path} height={height}/>
      <ArticleSuggestion />
    </View>
  );
}

const styles = StyleSheet.create({
  // Now I will add the breakpoints for KnowledgeContainer
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
