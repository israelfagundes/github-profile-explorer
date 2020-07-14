import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Loading,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

class User extends Component {
  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        user: PropTypes.shape({
          name: PropTypes.string,
          login: PropTypes.string,
          bio: PropTypes.string,
          avatar: PropTypes.string,
        }),
      }),
    }).isRequired,
  };

  state = {
    stars: [],
    loading: false,
    page: 1,
    refreshing: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    this.load();
  }

  load = async (page = 1) => {
    const { stars } = this.state;
    const { route } = this.props;
    const { user } = route.params;

    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page },
    });

    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      page,
      loading: false,
      refreshing: false,
    });
  };

  loadMore = () => {
    const { stars, page } = this.state;

    if (stars.length < 30) {
      return false;
    }

    const nextPage = page + 1;

    this.load(nextPage);
  };

  refreshList = () => {
    this.setState({ refreshing: true }, this.load);
  };

  handleNavigateRepo = (repo) => {
    const { navigation } = this.props;

    navigation.navigate('Repo', { repo });
  };

  renderFooter = () => {
    const { loading, page } = this.state;

    if (!loading && page === 1) return null;

    return <ActivityIndicator color="#ccc" size={20} />;
  };

  render() {
    const { route } = this.props;
    const { stars, loading, page, refreshing } = this.state;

    const { user } = route.params;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading && page === 1 ? (
          <Loading>
            <ActivityIndicator color="#7159c1" size={50} />
          </Loading>
        ) : (
          <Stars
            data={stars}
            keyExtractor={(star) => String(star.id)}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            ListFooterComponent={this.renderFooter}
            renderItem={({ item }) => (
              <Starred onPress={() => this.handleNavigateRepo(item)}>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}

export default User;
