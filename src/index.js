import React from "react";
import PropTypes from "prop-types";
import unicode from "unicode-regex";
import { Linking, Platform, Text, StyleSheet, Alert } from "react-native";

const styles = StyleSheet.create({
  linkStyle: {
    color: "#2980b9"
  }
});

const uni = unicode({ General_Category: ['Letter', 'Number'] })
  .toRegExp()
  .toString()

const letters = uni
  .substring(1, uni.length - 1);

const PATTERN_HASHTAG = new RegExp(
  `[#](?:${letters})+`,
  'gi',
);

const PATTERN_MENTION = new RegExp(
  `[@](?:${letters})+`,
  'gi',
);

const PATTERN_EMAIL = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
const PATTERN_URL = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const matchesWith = (str, pattern) => {
  let match = null;
  const arr = [];
  while ((match = pattern.exec(str)) != null) {
    arr.push([match, pattern]);
  }
  return arr;
};

const splitStringByMatches = (str, matches) => {
  const arr = [];
  let o = 0;

  matches.forEach(([match, pattern]) => {
    const { index } = { ...match };
    const text = match[match.length - 1];
    arr.push([str.slice(o, index), null]);
    arr.push([str.slice(index, index + text.length + 1), pattern]);
    o = index + text.length + 1;
  });

  arr.push([str.slice(o, str.length), null]);

  return arr.filter(([s]) => s.length > 0);
};

const TwitterTextView = ({
  children = "",
  extractHashtags,
  onPressHashtag,
  hashtagStyle,
  extractMentions,
  onPressMention,
  mentionStyle,
  extractLinks,
  onPressLink,
  linkStyle,
  extractEmails,
  onPressEmail,
  emailStyle,
  ...extraProps
}) => {
  const str = (typeof children === "string" && children) || "";

  const patterns = [
    !!extractHashtags && PATTERN_HASHTAG,
    !!extractMentions && PATTERN_MENTION,
    !!extractEmails && PATTERN_EMAIL,
    !!extractLinks && PATTERN_URL
  ].filter(e => !!e);

  const matches = []
    .concat(...patterns.map(pattern => matchesWith(str, pattern)))
    .filter(e => !!e)
    .sort(([a], [b]) => ({ ...a }.index - { ...b }.index));

  const onPress = {
    [PATTERN_HASHTAG]: onPressHashtag,
    [PATTERN_MENTION]: onPressMention,
    [PATTERN_EMAIL]: onPressEmail,
    [PATTERN_URL]: onPressLink
  };
  const style = {
    [PATTERN_HASHTAG]: hashtagStyle,
    [PATTERN_MENTION]: mentionStyle,
    [PATTERN_EMAIL]: emailStyle,
    [PATTERN_URL]: linkStyle
  };

  return (
    <Text {...extraProps}>
      {splitStringByMatches(str, matches).map(([str, pattern], i) => {
        return (
          <Text
            key={i}
            style={style[pattern]}
            onPress={(e) => {
              const handle = onPress[pattern];
              if (handle) {
                return handle(e, str);
              }
              return undefined;
            }}
            children={str}
          />
        );
      })}
    </Text>
  );
};

const textStyleProps = PropTypes.oneOfType([
  PropTypes.shape({}),
  PropTypes.number
]);

TwitterTextView.propTypes = {
  children: PropTypes.string,
  extractHashtags: PropTypes.bool,
  onPressHashtag: PropTypes.func,
  hashtagStyle: textStyleProps,
  extractMentions: PropTypes.bool,
  onPressMention: PropTypes.func,
  mentionStyle: textStyleProps,
  extractLinks: PropTypes.bool,
  onPressLink: PropTypes.func,
  linkStyle: textStyleProps
};

TwitterTextView.defaultProps = {
  children: "",
  extractHashtags: true,
  onPressHashtag: (e, hashtag) => {
    const msg = `Hashtag: "${hashtag}"`;
    if (Platform.OS !== "web") {
      Alert.alert(msg);
    } else {
      console.log(msg);
    }
  },
  hashtagStyle: styles.linkStyle,
  extractMentions: true,
  onPressMention: (e, mention) => {
    const msg = `Mention: "${mention}"`;
    if (Platform.OS !== "web") {
      Alert.alert(msg);
    } else {
      console.log(msg);
    }
  },
  mentionStyle: styles.linkStyle,
  extractLinks: true,
  onPressLink: (e, url) =>
    Linking.canOpenURL(url).then(canOpen => !!canOpen && Linking.openURL(url)),
  linkStyle: styles.linkStyle,
  extractEmails: true,
  onPressEmail: (e, url) =>
    Linking.canOpenURL(`mailto:${url}`).then(
      canOpen => !!canOpen && Linking.openURL(`mailto:${url}`)
    ),
  emailStyle: styles.linkStyle
};

export default TwitterTextView;
