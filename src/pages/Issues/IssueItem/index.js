import React from 'react';
import PropTypes from 'prop-types';

import {
  View, Text, Image, TouchableOpacity, Linking,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const IssueItem = ({ issue }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.touchable}
      onPress={() => {
        Linking.canOpenURL(issue.html_url).then((supported) => {
          if (supported) {
            Linking.openURL(issue.html_url);
          } else {
            console.tron.log(`Don't know how to open URI: ${issue.url}`);
          }
        });
      }}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.avatar} source={{ uri: issue.user.avatar_url }} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
          {issue.title}
        </Text>
        <Text style={styles.organizationText}>{issue.user.login}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="angle-right" size={12} style={styles.icon} />
      </View>
    </TouchableOpacity>
  </View>
);

IssueItem.propTypes = {
  issue: PropTypes.shape({
    html_url: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.shape({
      login: PropTypes.string,
      avatar_url: PropTypes.string,
    }),
  }).isRequired,
};

export default IssueItem;
