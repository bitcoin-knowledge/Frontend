import { StyleSheet, FlatList, SafeAreaView, ScrollView, Pressable } from 'react-native';
import {Card, Button, Icon} from "react-native-elements";
import ReactLoading from 'react-loading';
import { MonoText } from './StyledText';
import { View } from './Themed';
import { useRef } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useSelector } from 'react-redux';

export default function ArticleSuggestion() {
  const loading = useSelector((state: any) => state.ChatbotReducer.loading);
  const articles = useSelector((state: any) => state.KnowledgeReducer.articles);
  const bottomListRef: any = useRef();

  const renderData = ({ item }: any) => {
    return(
      <Card containerStyle={{width: 600, margin: 'auto', marginBottom: 25, marginTop: 15, borderColor: 'black'}}>
        <Card.Title style={styles.articleTitle}>{item.title}</Card.Title>
        <Card.Divider/>
        <Card.Image style={styles.image} source={{uri: 'https://bitcoin.org/img/icons/opengraph.png?1648897668'}} />
        <MonoText style={styles.articleBody}>
            {item.body}
        </MonoText>
        <Button
          icon={<Icon tvParallaxProperties={null} name='code' color='#ffffff' />}
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='READ' />
    </Card>
    )
  }

  return (
      <SafeAreaView style={styles.knowledgeContainer}>
        <ScrollView style={styles.scroll} ref={bottomListRef}>
          <FlatList
            data={articles}
            renderItem={renderData}
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
  }
});
