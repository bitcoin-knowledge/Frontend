import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function ArticleSuggestion({ path }: { path: string }) {
  return (
    <View>
      <View style={styles.articleContainer}>
        <Text style={styles.getStartedText}>
            Article Container
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  articleContainer: {
    backgroundColor: '#555d50',
    borderWidth: 4,
    borderLeftColor: '#F2A900',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
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
