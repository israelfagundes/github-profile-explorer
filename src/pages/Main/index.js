import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  DeleteButton,
  Avatar,
  Name,
  Bio,
  Actions,
  ProfileButton,
  ProfileButtonText,
} from './styles';

class Main extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    newUser: '',
    users: [],
    loading: false,
    error: false,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;

    this.setState({ loading: true, error: false });

    try {
      if (newUser === '') throw new Error('Você precisa indicar um usuário');

      const hasUser = users.find(
        (user) => String(user.login).toLowerCase() === newUser.toLowerCase()
      );

      if (hasUser) throw new Error('Usuário duplicado');

      const response = await api.get(`/users/${newUser}`);

      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url,
      };

      this.setState({
        users: [...users, data],
        newUser: '',
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: true,
        loading: false,
      });
      return;
    } finally {
      Keyboard.dismiss();
    }
  };

  handleNavigate = (user) => {
    const { navigation } = this.props;

    navigation.navigate('User', { user });
  };

  deleteItem = (item) => {
    const { users } = this.state;

    const newUsers = users.filter((user) => user !== item);

    this.setState({ users: newUsers });
  };

  render() {
    const { newUser, users, loading, error } = this.state;

    return (
      <Container>
        <Form>
          <Input
            error={error}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={(text) =>
              this.setState({ newUser: text, error: false })
            }
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={(user) => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <Actions>
                <ProfileButton onPress={() => this.handleNavigate(item)}>
                  <ProfileButtonText>Ver Perfil</ProfileButtonText>
                </ProfileButton>
                <DeleteButton onPress={() => this.deleteItem(item)}>
                  <Icon name="delete" color="#fff" size={25} />
                </DeleteButton>
              </Actions>
            </User>
          )}
        />
      </Container>
    );
  }
}

export default Main;
