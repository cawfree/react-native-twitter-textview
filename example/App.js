import * as React from "react";
import { View, Text, TextInput } from "react-native";
import TwitterTextView from "react-native-twitter-textview";

export default function App() {
  const [value, onChangeText] = React.useState('');
  return (
    <View
      style={StyleSheet.absoluteFill}
    >
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder="Type some #hashtags or @mentions to get started."
        multiline
        numberOfLines={4}
      />
      <TwitterTextView>
        {value}
      </TwitterTextView>
    </View>
  );
}
