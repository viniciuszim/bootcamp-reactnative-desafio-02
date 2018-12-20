import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '~/services/api';

import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  FlatList,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';

import Header from '~/components/Header';

import Icon from 'react-native-vector-icons/FontAwesome';

import RepositoryItem from './RepositoryItem';
import styles from './styles';

export default class Repository extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  static navigationOptions = () => {
    'GitIssues';
  };

  state = {
    repository: 'Rocketseat/rocketnative-sublime-snippets',
    data: [],
    loading: true,
    refreshing: true,
    error: '',
  };

  componentDidMount() {
    this.loadRepositories();
  }

  addRepositoryHandle = async () => {
    this.setState({ refreshing: true });

    try {
      const { repository } = this.state;

      const { data } = await api.get(`/repos/${repository}`);

      const { data: stateData } = this.state;

      AsyncStorage.setItem('@GitIssues:repos', JSON.stringify([...stateData, data]));

      this.setState({ data: [...stateData, data], loading: false, refreshing: false });
    } catch (error) {
      this.setState({ loading: false, refreshing: false, error: 'Repositório não existe!' });
    }
  };

  loadRepositories = async () => {
    this.setState({ refreshing: true });

    AsyncStorage.getItem('@GitIssues:repos', (err, item) => {
      if (item) {
        const data = JSON.parse(item);
        this.setState({ data, loading: false, refreshing: false });
      } else {
        this.setState({ loading: false, refreshing: false });
      }
    });
  };

  renderListItem = ({ item }) => {
    const { navigation } = this.props;
    return <RepositoryItem navigation={navigation} repository={item} />;
  };

  renderList = () => {
    const { data, refreshing } = this.state;

    return data.length > 0 ? (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadRepositories}
        refreshing={refreshing}
      />
    ) : (
      <View style={styles.noneContainer}>
        <Text style={styles.noneText}>Nenhum repositório adicionado!</Text>
      </View>
    );
  };

  render() {
    const { loading, error } = this.state;
    return (
      <View style={styles.container}>
        <Header title="GitIssues" />

        <View style={styles.addRepository}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Adicionar novo repositório"
            underlineColorAndroid="transparent"
            onChangeText={text => this.setState({ repository: text })}
          />

          <TouchableOpacity onPress={this.addRepositoryHandle}>
            <Icon name="plus" size={16} style={styles.icon} />
          </TouchableOpacity>

          {!!error && <Text style={styles.error}>Error.</Text>}
        </View>
        <View style={styles.listRepository}>
          {loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}
        </View>
      </View>
    );
  }
}
