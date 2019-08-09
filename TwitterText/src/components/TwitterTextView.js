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
    {children
      .split(' ')
      .map(
        (word, i) => {
          const pfx = (i > 0) ? ' ' : '';
          if (extractHashtags) {
            const [ hashtag ] = shouldExtractHashtags(
              word,
            ) || [];
            if (hashtag) {
              return (
                <Text
                  onPress={e => onPressHashtag(e, hashtag)}
                  style={hashtagStyle}
                >
                  {`${pfx}#${hashtag}`}
                </Text>
              );
            }
          }
          if (extractMentions) {
            const [ mention ] = shouldExtractMentions(
              word,
            ) || [];
            if (mention) {
              return (
                <Text
                  onPress={e => onPressMention(e, mention)}
                  style={mentionStyle}
                >
                  {`${pfx}@${mention}`}
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
    if (Platform.OS !== 'web') {
      Alert.alert(hashtag);
    } else {
      console.log(hashtag);
    }
  },
  hashtagStyle: styles.linkStyle,
  extractMentions: true,
  onPressMention: (e, mention) => {
    if (Platform.OS !== 'web') {
      Alert.alert(mention);
    } else {
      console.log(mention);
    }
  },
  mentionStyle: styles.linkStyle,
};

export default TwitterTextView;
