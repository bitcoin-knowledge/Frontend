import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';
import {Card, Button, Icon} from "react-native-elements";
import { StyleSheet, FlatList, ScrollView, Pressable, Image } from 'react-native';
import ReactLoading from 'react-loading';
import { MonoText } from '../StyledText';
import { View } from '../Themed';
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
      <Card containerStyle={{width: 600, margin: 'auto', marginBottom: 25, marginTop: 15, borderColor: 'black', backgroundColor:'oldlace'}}>
        <Card.Title style={styles.articleTitle}>{item.title}</Card.Title>
        <Card.Divider/>
        <Card.Image style={styles.image} source={{uri: 'https://bitcoin.org/img/icons/opengraph.png?1648897668'}} />
        <MonoText style={styles.articleBody}>
            {item.body}
        </MonoText>
        <Button
          icon={<Icon tvParallaxProperties={null} name='code' color='black' />}
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#F2A900'}}
          titleStyle={{color: 'black'}}
          title='READ' />
      </Card>
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
            contentContainerStyle={styles.listView}
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
