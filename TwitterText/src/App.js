import React from 'react';
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

class App extends React.Component {
  render() {
    return (
      <View
        style={StyleSheet.absoluteFill}
      >
        <TwitterTextView
          style={styles.twitterTextView}
          hashtagStyle={styles.hashtagStyle}
          mentionStyle={styles.mentionStyle}
        >
          {'some text #hashtag @mention'}
        </TwitterTextView>
      </View>
    );
  }
}

let hotWrapper = () => () => App;
if (Platform.OS === 'web') {
  const { hot } = require('react-hot-loader');
  hotWrapper = hot;
}
export default hotWrapper(module)(App);
