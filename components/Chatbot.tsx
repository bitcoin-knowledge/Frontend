import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity } from 'react-native';
import InfiniteScroll from 'react-infinite-scroll-component';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function Chatbot({ path, messages }: { path: string, messages: Array<{ id: number, text: string, name: string }> }) {

  return (
      <View style={styles.chatbotContainer}>
        <InfiniteScroll
            dataLength={3} //This is important field to render the next data
            loader={<h4>Loading...</h4>}
            next={() => null}
            hasMore={false}
        >
            {messages.map((message, index) => {
                return (
                    <View key={index}>
                        <View style={styles.chatTextContainer}>
                            <MonoText>{message.text}</MonoText>
                        </View>
                    </View>
                )
            })}
        </InfiniteScroll>
      </View>
  );
}

const styles = StyleSheet.create({
  chatbotContainer: {
    width: '50%',
    backgroundColor: '#536878',
    borderWidth: 4,
    borderRightColor: '#F2A900',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 5,
    alignItems: 'center',
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  scrollComponentStyles: {
    borderWidth: 4,
    borderTopColor: 'white',
  },
  chatTextContainer: {
    borderWidth: 4,
    borderColor: '#F2A900',
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  
});
