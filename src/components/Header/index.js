import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import {
  View, Text, StatusBar, TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

class Header extends Component {
  static propTypes = {
    back: PropTypes.bool,
    title: PropTypes.string.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  static defaultProps = {
    back: false,
  };

  backToPrevPag = async () => {
    const { navigation } = this.props;
    navigation.navigate('Repositories');
  };

  render() {
    const { back, title } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.left}>
          {!!back && (
            <TouchableOpacity
              onPress={() => {
                this.backToPrevPag();
              }}
            >
              <Icon name="chevron-left" size={16} style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.right} />
      </View>
    );
  }
}

export default withNavigation(Header);
