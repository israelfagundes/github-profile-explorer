import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';
import Repo from './pages/Repo';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#44475a' },
          headerTintColor: '#fff',
        }}
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Home"
          component={Main}
          options={{ title: 'Usuários' }}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={({ route }) => ({ title: route.params.user.name })}
        />
        <Stack.Screen
          name="Repo"
          component={Repo}
          options={({ route }) => ({ title: route.params.repo.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
