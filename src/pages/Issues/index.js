import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '~/services/api';

import {
  View, Text, ActivityIndicator, FlatList, TouchableOpacity,
} from 'react-native';

import Header from '~/components/Header';

import IssueItem from './IssueItem';
import styles from './styles';

export default class Welcome extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    filter: 'all',
    repository: '',
    data: [],
    loading: true,
    refreshing: true,
    error: '',
  };

  componentDidMount() {
    this.loadIssues();
  }

  loadIssues = async () => {
    const { navigation } = this.props;
    const repoId = navigation.getParam('itemId');
    const repository = navigation.getParam('name');

    this.setState({ repository, refreshing: true });

    const { filter } = this.state;

    try {
      const { data } = await api.get(`/repositories/${repoId}/issues?state=${filter}`);

      this.setState({
        data,
        loading: false,
        refreshing: false,
      });
    } catch (error) {
      this.setState({ loading: false, refreshing: false, error: 'Repositório não existe!' });
    }
  };

  renderListItem = ({ item }) => <IssueItem issue={item} />;

  renderList = () => {
    const { data, refreshing } = this.state;

    return data.length > 0 ? (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadIssues}
        refreshing={refreshing}
      />
    ) : (
      <View style={styles.noneContainer}>
        <Text style={styles.noneText}>Nenhum issue adicionado!</Text>
      </View>
    );
  };

  filterIssueHandle = async (type) => {
    await this.setState({ filter: type });
    await this.loadIssues();
  };

  render() {
    const {
      filter, repository, loading, error,
    } = this.state;
    return (
      <View style={styles.container}>
        <Header back title={repository} />

        <View style={styles.filterIssue}>
          <TouchableOpacity
            onPress={() => {
              this.filterIssueHandle('all');
            }}
          >
            <Text style={filter === 'all' ? styles.filterTextActivate : styles.filterText}>
              Todas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.filterIssueHandle('open');
            }}
          >
            <Text style={filter === 'open' ? styles.filterTextActivate : styles.filterText}>
              Abertas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.filterIssueHandle('closed');
            }}
          >
            <Text style={filter === 'closed' ? styles.filterTextActivate : styles.filterText}>
              Fechadas
            </Text>
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
