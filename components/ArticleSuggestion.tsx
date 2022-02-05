import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function ArticleSuggestion({ path }: { path: string }) {
  return (
    <View>
      <View style={styles.knowledgeContainer}>
        <Text style={styles.getStartedText}>
            Article Container
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  knowledgeContainer: {
    width: '80%',
    border: '4px solid #F2A900',
    borderTop: '45px solid #F2A900',
    borderRadius: 25,
    padding: 5,
    alignItems: 'center',
    marginHorizontal: 50,
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
