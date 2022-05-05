import { StyleSheet, FlatList, SafeAreaView, ScrollView, Pressable } from 'react-native';
import {Card, Button, Icon} from "react-native-elements";
import ReactLoading from 'react-loading';
import { KnowledgeComponent } from '../knowledge/KnowledgeComponent';
import { MonoText } from '../StyledText';
import { View } from '../Themed';
import { useRef } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useSelector } from 'react-redux';

export default function ArticleSuggestion() {
  const loading = useSelector((state: any) => state.ChatbotReducer.loading);
  const articles = useSelector((state: any) => state.KnowledgeReducer.articles);
  const bottomListRef: any = useRef();

  return (
      <SafeAreaView style={styles.knowledgeContainer}>
        <ScrollView style={styles.scroll} ref={bottomListRef}>
          {/* <FlatList
            data={articles}
            renderItem={KnowledgeComponent}
          /> */}
          <MonoText>Article suggestions still under construction</MonoText>
          {loading ?
          <View style={styles.chatBubbles}>
            <ReactLoading type={'spinningBubbles'} color={"#F2A900"} height={"10%"} width={"10%"} />
          </View>
          : null}
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  knowledgeContainer: {
    display: 'flex',
    width: '50%',
    height: '87%',
    backgroundColor: 'black',
    borderWidth: 4,
    borderRightColor: '#F2A900',
    borderTopColor: '#F2A900',
    borderLeftColor: '#F2A900',
    borderBottomColor: '#F2A900',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: 'center',
  },
  scroll: {
    height: '100%',
    width: '100%',
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
  },
  image: {
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  articleTitle: {
    textAlign: 'center',
    fontSize: 18,
  },
  articleBody: {
    marginTop: 10,
    marginBottom: 10,
    color: 'black',
    textAlign: 'center',
    fontSize: 13,
  },
  articleTagContainer: {
    padding: 5,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
  },
  tag: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 2,
    backgroundColor: '#8BCDDE'
  },
  podcastTag: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 2,
    backgroundColor: '#55DDBB'
  }
});
