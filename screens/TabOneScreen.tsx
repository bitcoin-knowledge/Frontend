import { StyleSheet } from 'react-native';
import { MonoText } from '../components/StyledText';
import EditScreenInfo from '../components/EditScreenInfo';
import MessageWindow from '../components/MessageWindow';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <MonoText style={styles.title}>Bitcoin Knowledge Bot</MonoText>
        <MonoText style={styles.subTitle}>A question & answer AI bot that also suggests articles/podcasts <br/> Powered by GPT-3 and trained on an open source dataset of established Bitcoin knowledge</MonoText>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
      <MessageWindow path='/screens/TabOneScreen.tsx' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 15,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 10,
    height: 2,
    width: '150%',
  },
});
