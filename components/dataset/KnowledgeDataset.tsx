import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';
import {Card, Button, Icon} from "react-native-elements";
import { StyleSheet, FlatList, ScrollView, Pressable, Image } from 'react-native';
import ReactLoading from 'react-loading';
import { KnowledgeComponent } from '../knowledge/KnowledgeComponent';
import { MonoText } from '../StyledText';
import { View } from '../Themed';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SET_LOADING, UPDATE_ALL_KNOWLEDGE, UPDATE_ALL_PODCASTS } from '../../store/Actions';
import KnowledgeInput from './KnowledgeInput';

export default function KnowledgeDataset({ path }: { path: string }) {
  const dispatch = useDispatch();
  const [height, setHeight] = useState(0);
  const loading = useSelector((state: any) => state.ChatbotReducer.loading);
  const knowledge = useSelector((state: any) => state.KnowledgeReducer.knowledge);
  const podcasts = useSelector((state: any) => state.KnowledgeReducer.podcasts);
  const query = useSelector((state: any) => state.KnowledgeReducer.query);
  const [filterState, setFilterState] = useState([]);
  const [combinedKnowledge, setCombinedKnowledge] = useState([]);

  useEffect(() => {
    dispatch({ type: SET_LOADING, payload: true });
    axios.get("https://bitcoin-knowledge-bot.herokuapp.com/knowledge")
    .then((response: any) => {
      dispatch({ type: SET_LOADING, payload: false });
      dispatch({ type: UPDATE_ALL_KNOWLEDGE, payload: response.data.articles });
      dispatch({ type: UPDATE_ALL_PODCASTS, payload: response.data.podcasts });
      setCombinedKnowledge(response.data.articles.concat(response.data.podcasts));
    })
    .catch((error: any) => {
        console.log(error)
    })
  },[])

  useEffect(() => {
    setFilterState(combinedKnowledge.filter(((knowledgeCard: any) =>  knowledgeCard.title.toLowerCase().includes(query.toLowerCase()))))
  },[query])

  return (
    <View style={styles.datasetContainer} onLayout={(event) => {
      const {height} = event.nativeEvent.layout;
      setHeight(height);
    }}>
        <ScrollView style={styles.scroll}>
        {loading ?
          <View style={styles.chatBubbles}>
            <ReactLoading type={'spinningBubbles'} color={"#F2A900"} height={"10%"} width={"10%"} />
          </View>
          :
          <FlatList
            data={query.length > 0 ? filterState : combinedKnowledge}
            renderItem={KnowledgeComponent}
            contentContainerStyle={styles.listView}
          />
        }
        </ScrollView>
        <View style={styles.sidebar}> 
          <MonoText style={styles.sidebarTitle}>Knowledge Data</MonoText>
          <View style={styles.sidebarStatsContainer}>
            <MonoText>Total Articles: {knowledge.length}</MonoText>
            <MonoText>Total podcasts: {podcasts.length}</MonoText>
          </View>
          <KnowledgeInput />
          <View style={styles.sidebarResultsContainer}>
            <MonoText style={styles.resultsText}>Search results: {filterState.length}</MonoText>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Now I will add the breakpoints for KnowledgeContainer
  datasetContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    padding: 2,
    borderWidth: 4,
    borderRightColor: '#F2A900',
    borderTopColor: '#F2A900',
    borderLeftColor: '#F2A900',
    borderBottomColor: '#F2A900',
  },
  articleContainer: {
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: '#F2A900',
    borderRadius: 10,
    padding: 5,
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
    flexDirection: 'column',
  },
  articleTextContainer: {
    width: '100%',
    margin: 'auto',
    flexDirection: 'column',
    paddingLeft: 3,
    paddingRight: 3,
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
  listView: {
    width: '100%',
    padding: '1%',
    alignItems: 'center'
  },
  body: {
    width: '80%',
  },
  sidebar: {
    width: '20%',
  },
  sidebarTitle: {
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 18,
  },
  sidebarStatsContainer: {
    margin: 25,
  },
  sidebarResultsContainer: {
    marginTop: 50,
    margin: 25
  },
  resultsText: {
    marginTop: 25,
    fontSize: 18,
    color: '#F2A900',
    textAlign: 'center',
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
