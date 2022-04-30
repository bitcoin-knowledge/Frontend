import { StyleSheet } from 'react-native';
import KnowledgeDataset from '../components/dataset/KnowledgeDataset';
import KnowledgeInput from '../components/dataset/KnowledgeInput';
import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <KnowledgeInput />
      <KnowledgeDataset path='/screens/TabTwoScreen.tsx' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
