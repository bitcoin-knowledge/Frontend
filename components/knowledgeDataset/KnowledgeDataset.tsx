import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, FlatList, ScrollView, Pressable } from 'react-native';
import Chatbot from '../chatbot/Chatbot';
import ArticleSuggestion from '../ArticleSuggestion';
import Colors from '../../constants/Colors';
import { MonoText } from '../StyledText';
import { Text, View } from '../Themed';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

export default function KnowledgeDataset({ path }: { path: string }) {
  const [height, setHeight] = useState(0);
  const articles = useSelector((state: any) => state.KnowledgeReducer.articles);
  const bottomListRef: any = useRef();

  const renderData = ({ item }: any) => {
    return(
        <View style={styles.articleContainer}>
          <MonoText style={{fontSize: 15}}>{item.title}</MonoText>
          <br></br>
          <MonoText>{item.body}</MonoText>
          <Pressable style={styles.button} onPress={() => WebBrowser.openBrowserAsync(item.url)}>
            <MonoText style={styles.buttonText}>read</MonoText>
          </Pressable>
        </View>
    )
  }

  return (
    <View style={styles.datasetContainer} onLayout={(event) => {
      const {height} = event.nativeEvent.layout;
      setHeight(height);
    }}>
        <ScrollView style={styles.scroll} ref={bottomListRef}>
          <FlatList
            data={articles}
            renderItem={renderData}
          />
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Now I will add the breakpoints for KnowledgeContainer
  datasetContainer: {
    width: '100%',
    height: '90%',
    flexDirection: 'row',
    padding: 2,
    borderWidth: 4,
    borderRightColor: '#F2A900',
    borderTopColor: '#F2A900',
    borderLeftColor: '#F2A900',
    borderBottomColor: '#F2A900'
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
  scroll: {
    height: '100%',
    backgroundColor: '#708090',
    borderBottomRightRadius: 10,
  },
  articleContainer: {
    maxWidth: '95%',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#F2A900',
    borderRadius: 10,
    padding: 10,
    margin: 7,
  },
  chatBubbles: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingLeft: '1%'
  },
  buttonText: {
    fontSize: 15,
  },
  button: {
    width: '15%',
    marginTop: '3%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#F2A900',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  }
});
