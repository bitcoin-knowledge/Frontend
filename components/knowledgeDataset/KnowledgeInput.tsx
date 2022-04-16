import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TextInput, Pressable, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MonoText } from '../StyledText';
import { Text, View } from '../Themed';
import { useEffect, useState } from 'react';
import { UPDATE_ID, SET_NEW_MESSAGE, UPDATE_QUERY } from '../../store/Actions';

export default function KnowledgeInput() {
  const dispatch = useDispatch();
  const query = useSelector((state: any) => state.KnowledgeReducer.query);
  const knowledge = useSelector((state: any) => state.KnowledgeReducer.knowledge);
  const id = useSelector((state: any) => state.ChatbotReducer.id);

  const handleChange = (event: any) => {
    dispatch({type: UPDATE_QUERY, payload: event.nativeEvent.text});
  }

  return (
    <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChange={handleChange} enablesReturnKeyAutomatically={true} value={query} placeholder='Type your search query here...' />
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
