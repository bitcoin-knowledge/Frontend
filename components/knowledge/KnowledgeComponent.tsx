import { StyleSheet, FlatList, SafeAreaView, ScrollView, Pressable } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import {Card, Button, Icon} from "react-native-elements";
import { MonoText } from '../StyledText';
import { View } from '../Themed';

export const KnowledgeComponent = ({ item }: any) => {
    return(
      <Card containerStyle={{width: 600, margin: 'auto', marginBottom: 25, marginTop: 15, borderColor: 'black', borderRadius: 10, borderWidth: 2, backgroundColor:'oldlace'}}>
        <Card.Title style={styles.articleTitle}>{item.title}</Card.Title>
        <Card.Divider/>
        <Card.Image style={styles.image} source={item.image == null ? {uri: 'https://bitcoin.org/img/icons/opengraph.png?1648897668'} : {uri: item.image}} />
        <MonoText style={styles.articleBody}>
            {item.body}
        </MonoText>
        <Card.Divider/>
          <View style={styles.articleTagContainer}>
            <MonoText style={item.type == 'podcast' ? styles.tag : styles.podcastTag}>{item.type}</MonoText>
          </View>
        <Button
            onPress={() => WebBrowser.openBrowserAsync(item.url)}
            icon={<Icon tvParallaxProperties={null} name='code' color='black' />}
            buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#F2A900', borderColor: 'black', borderWidth: 1}}
            titleStyle={{color: 'black'}}
            title='READ' />
    </Card>
    )
  }

  const styles = StyleSheet.create({
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
      borderRadius: 7,
      color: 'black',
      fontSize: 13,
      fontWeight: 'bold',
      letterSpacing: 2,
      backgroundColor: '#8BCDDE',
      shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    podcastTag: {
      borderWidth: 1,
      borderColor: 'black',
      padding: 5,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 7,
      color: 'black',
      fontSize: 13,
      fontWeight: 'bold',
      letterSpacing: 2,
      backgroundColor: '#55DDBB',
      shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
  });
  