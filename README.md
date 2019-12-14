# react-native-twitter-textview
A `<Text/>` component for [React Native](https://facebook.github.io/react-native) and [React Native Web](https://github.com/necolas/react-native-web) that automatically detects **#hashtags** and **@mentions**.

<p align="center">
  <img src="./bin/out.gif" width="600" height="164">
</p>

## 🚀 Getting Started
Using [`npm`](https://www.npmjs.com/package/react-native-twitter-textview):

```
npm install --save react-native-twitter-textview
```

Using [`yarn`](https://www.npmjs.com/package/react-native-twitter-textview):

```
yarn add react-native-twitter-textview
```

## ✍️ Usage
It's super easy; just replace your React Native [`<Text />`](https://facebook.github.io/react-native/docs/text.html) component with a [`<TwitterTextView />`](./TwitterText/src/components/TwitterTextView), and there you go!

```javascript
const App = () => {
  const [value, onChangeText] = useState('');
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
      <TwitterTextView
        style={styles.twitterTextView}
        hashtagStyle={styles.hashtagStyle}
        mentionStyle={styles.mentionStyle}
        linkStyle={styles.linkStyle}
      >
        {value}
      </TwitterTextView>
    </View>
  );
}
```

## 📋 Props
-----
Prop                  | Type     | Default                   | Required | Description
--------------------- | -------- | ------------------------- | -------- | -----------
children|string|''|No|The text to render.
extractHashtags|bool|true|No|Whether you wish to support hashtags.
onPressHashtag|func|(e, hashtag) => null|No|Called when a detected hashtag is clicked.
hashtagStyle|shape[object Object]|styles.linkStyle|No|Hashtag style.
extractMentions|bool|true|No|Whether you wish to support mentions.
onPressMention|func|(e, hashtag) => null|No|Called when a detected mention is clicked.
mentionStyle|shape[object Object]|styles.linkStyle|No|Mention style.
extractLinks|bool|true|No|Whether you wish to support links.
onPressLink|func|(e, link) => Linking.openURL(link)|No|Called when a detected link is clicked.
linkStyle|shape[object Object]|styles.linkStyle|No|Link style.

## ✌️ License
[MIT](https://opensource.org/licenses/MIT)

## [@cawfree](https://twitter.com/cawfree)

Open source takes a lot of work! If this project has helped you, please consider [buying me a coffee](https://www.buymeacoffee.com/cawfree). ☕ 

<p align="center">
  <a href="https://www.buymeacoffee.com/cawfree">
    <img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy @cawfree a coffee" width="232" height="50" />
  </a>
</p>
