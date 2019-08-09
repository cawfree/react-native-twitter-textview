import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import TwitterTextView from './components/TwitterTextView';

const styles = StyleSheet
  .create(
    {
      twitterTextView: {
        fontSize: 20,
      },
      hashtagStyle: {
        color: 'blue',
        fontWeight: 'bold',
      },
      mentionStyle: {
        color: 'green',
        fontWeight: 'bold',
      },
    },
  );

const App = ({}) => {
  const [value, onChangeText] = useState('');
  return (
    <View
      style={StyleSheet.absoluteFill}
    >
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder="Type some #hashtags, @mentions or urls to get started."
        multiline
        numberOfLines={4}
      />
      <TwitterTextView
        style={styles.twitterTextView}
        hashtagStyle={styles.hashtagStyle}
        mentionStyle={styles.mentionStyle}
      >
        {value}
      </TwitterTextView>
    </View>
  );
}

let hotWrapper = () => () => App;
if (Platform.OS === 'web') {
  const { hot } = require('react-hot-loader');
  hotWrapper = hot;
}
export default hotWrapper(module)(App);
