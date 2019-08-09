import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  extractHashtags as shouldExtractHashtags,
  extractMentions as shouldExtractMentions,
} from 'twitter-text';

const styles = StyleSheet
  .create(
    {
      linkStyle: {
        color: '#2980b9',
      },
    },
  );

const sanitize = (str = '') => str
  .replace(/#/g, ' #')
  .replace(/@/g, ' @')
  .replace(/\s\s+/g, ' ');

const TwitterTextView = ({
  children = '',
  extractHashtags,
  onPressHashtag,
  hashtagStyle,
  extractMentions,
  onPressMention,
  mentionStyle,
  ...extraProps,
}) => (
  <Text
    {...extraProps}
  >
    {sanitize(children)
      .split(' ')
      .map(
        (word, i) => {
          const pfx = (i > 0) ? ' ' : '';
          if (extractHashtags) {
            const [ hashtag ] = shouldExtractHashtags(
              word,
            ) || [];
            if (hashtag) {
              const result = `${pfx}#${hashtag}`;
              const after = `${word.substring(hashtag.length + 1)}`;
              return (
                <Text
                >
                  <Text
                    onPress={e => onPressHashtag(e, hashtag)}
                    style={hashtagStyle}
                  >
                    {`${result}`}
                  </Text>
                  <Text
                  >
                    {`${after}`}
                  </Text>
                </Text>
              );
            }
          }
          if (extractMentions) {
            const [ mention ] = shouldExtractMentions(
              word,
            ) || [];
            if (mention) {
              const result = `${pfx}@${mention}`;
              const after = `${word.substring(mention.length + 1)}`;
              return (
                <Text
                >
                  <Text
                    onPress={e => onPressMention(e, mention)}
                    style={mentionStyle}
                  >
                    {`${result}`}
                  </Text>
                  <Text
                  >
                    {`${after}`}
                  </Text>
                </Text>
              );
            }
          }
          return (
            <Text
            >
              {`${pfx}${word}`}
            </Text>
          );
        },
      )}
  </Text>
);

TwitterTextView.propTypes = {
  children: PropTypes.string,
  extractHashtags: PropTypes.bool,
  onPressHashtag: PropTypes.func,
  hashtagStyle: PropTypes.shape({}),
  extractMentions: PropTypes.bool,
  onPressMention: PropTypes.func,
  mentionStyle: PropTypes.shape({}),
};

TwitterTextView.defaultProps = {
  children: '',
  extractHashtags: true,
  onPressHashtag: (e, hashtag) => {
    const msg = `Hashtag: "${hashtag}"`;
    if (Platform.OS !== 'web') {
      Alert.alert(msg);
    } else {
      console.log(msg);
    }
  },
  hashtagStyle: styles.linkStyle,
  extractMentions: true,
  onPressMention: (e, mention) => {
    const msg = `Mention: "${mention}"`;
    if (Platform.OS !== 'web') {
      Alert.alert(msg);
    } else {
      console.log(msg);
    }
  },
  mentionStyle: styles.linkStyle,
};

export default TwitterTextView;
