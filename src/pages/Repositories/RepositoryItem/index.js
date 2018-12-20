import React from 'react';
import PropTypes from 'prop-types';

import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const RepositoryItem = ({ navigation, repository }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.touchable}
      onPress={() => {
        navigation.navigate('Issues', {
          itemId: repository.id,
          name: repository.name,
        });
      }}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.avatar} source={{ uri: repository.owner.avatar_url }} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.titleText}>{repository.name}</Text>
        <Text style={styles.organizationText}>{repository.owner.login}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="angle-right" size={12} style={styles.icon} />
      </View>
    </TouchableOpacity>
  </View>
);

RepositoryItem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  repository: PropTypes.shape({
    name: PropTypes.string,
    owner: PropTypes.shape({
      login: PropTypes.string,
      avatar_url: PropTypes.string,
    }),
  }).isRequired,
};

export default RepositoryItem;
