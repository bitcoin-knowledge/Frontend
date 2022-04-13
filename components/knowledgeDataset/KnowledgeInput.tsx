import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TextInput, Pressable, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MonoText } from '../StyledText';
import { Text, View } from '../Themed';
import { useState } from 'react';
import { UPDATE_ID, SET_NEW_MESSAGE } from '../../store/Actions';

export default function KnowledgeInput() {
  const dispatch = useDispatch();
  const [text, onChangeText] = useState('');
  const id = useSelector((state: any) => state.ChatbotReducer.id);

  const handleOnSubmit = () => {
    onChangeText('');
    // create user message from prompt
    dispatch({ type: UPDATE_ID, payload: id + 1 });
    const userMessage = {
      id: id,
      text: text,
      name: "User"
    }
    // add user message to messages
    setTimeout(() => {
      dispatch({ type: SET_NEW_MESSAGE, payload: userMessage });
    }, 1000)
  }

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key === 'Enter') {
      handleOnSubmit();
    }
  }

  return (
    <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={onChangeText} onKeyPress={handleKeyPress} enablesReturnKeyAutomatically={true} value={text} placeholder='Type your search query here...' />
        <Pressable style={styles.button} onPress={() => handleOnSubmit()}>
            <MonoText style={styles.buttonText}>send</MonoText>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%',
    flexDirection: 'row',
    borderWidth: 2,
    padding: 10,
    alignItems: 'center',
    borderColor: '#F2A900',
    borderRadius: 15,
    marginBottom: 5,
  },
  input: {
    width: '99%',
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 15,
  },
  button: {
    width: '20%',
    padding: 10,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#F2A900',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});
