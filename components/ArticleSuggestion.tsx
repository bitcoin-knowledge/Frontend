import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, FlatList, SafeAreaView, ScrollView } from 'react-native';
import ReactLoading from 'react-loading';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SET_LOADING } from '../../store/Actions';
import axios from 'axios';
import { UPDATE_ID, SET_NEW_MESSAGE } from '../../store/Actions';

export default function ArticleSuggestion() {
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.ChatbotReducer.loading);
  const articles = useSelector((state: any) => state.KnowledgeReducer.articles);
  const bottomListRef: any = useRef();

  const renderData = ({ item }: any) => {
    return(
        <View style={styles.articleContainer}>
          <MonoText>{item.title}</MonoText>
          <MonoText>{item.body}</MonoText>
        </View>
    )
  }

  return (
      <SafeAreaView style={styles.knowledgeContainer}>
        <ScrollView style={styles.scroll} ref={bottomListRef}>
          <FlatList
            data={articles}
            renderItem={renderData}
            style={styles.chatLog}
          />
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
    marginBottom: 5,
    backgroundColor: '#708090',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
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
  }
});
