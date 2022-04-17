import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';
import { StyleSheet, FlatList, ScrollView, Pressable, Image } from 'react-native';
import ReactLoading from 'react-loading';
import { MonoText } from '../StyledText';
import { Text, View } from '../Themed';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SET_LOADING, UPDATE_ALL_KNOWLEDGE } from '../../store/Actions';

export default function KnowledgeDataset({ path }: { path: string }) {
  const dispatch = useDispatch();
  const [height, setHeight] = useState(0);
  const loading = useSelector((state: any) => state.ChatbotReducer.loading);
  const knowledge = useSelector((state: any) => state.KnowledgeReducer.knowledge);
  const query = useSelector((state: any) => state.KnowledgeReducer.query);
  const [filterState, setFilterState] = useState([]);

  useEffect(() => {
    dispatch({ type: SET_LOADING, payload: true });
    axios.get("https://bitcoin-knowledge-bot.herokuapp.com/knowledge")
    .then((response: any) => {
      dispatch({ type: SET_LOADING, payload: false });
      dispatch({ type: UPDATE_ALL_KNOWLEDGE, payload: response.data });
    })
    .catch((error: any) => {
        console.log(error)
    })
  },[])

  useEffect(() => {
    setFilterState(knowledge.filter(((knowledgeCard: any) =>  knowledgeCard.title.toLowerCase().includes(query.toLowerCase()))))
  },[query])
  

  const renderData = ({ item }: any) => {
    return(
          <Pressable style={styles.articleContainer} onPress={() => WebBrowser.openBrowserAsync(item.url)}>
            <Image style={styles.image} source={{uri: 'https://bitcoin.org/img/icons/opengraph.png?1648897668'}} />
            <View style={styles.articleTextContainer}>
              <MonoText style={styles.articleTitle}>{item.title}</MonoText>
              <MonoText style={styles.articleBody}>{item.body}</MonoText>
            </View>
          </Pressable>
    )
  }

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
            data={query.length > 0 ? filterState : knowledge}
            renderItem={renderData}
          />
        }
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
  articleContainer: {
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: '#F2A900',
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  articleTextContainer: {
    width: '90%',
    flexDirection: 'column',
    paddingLeft: 3,
    paddingRight: 3,
  },
  image: {
    width: 70,
    height: 70,
    alignSelf: 'flex-start',
  },
  articleTitle: {
    textAlign: 'center',
    fontSize: 18,
  },
  articleBody: {
    textAlign: 'center',
    fontSize: 13,
  },
  body: {
    width: '80%',
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
