import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'; // createSwitchNavigator não gera historico
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '~/components/Header';

import SignIn from '~/pages/SignIn';
import Checkin from '~/pages/Checkin';
import Help from '~/pages/Help';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: SignIn,
        App: createBottomTabNavigator(
          {
            Checkin: createStackNavigator(
              {
                Checkin,
              },
              {
                navigationOptions: {
                  tabBarLabel: 'Check-ins',
                  tabBarIcon: ({tintColor}) => (
                    <Icon name="edit-location" size={20} color={tintColor} />
                  ),
                },
                defaultNavigationOptions: {
                  headerTitle: () => <Header />,
                },
              }
            ),
            Help: createStackNavigator(
              {
                Help,
              },
              {
                navigationOptions: {
                  tabBarLabel: 'Ajuda',
                  tabBarIcon: ({tintColor}) => (
                    <Icon name="live-help" size={20} color={tintColor} />
                  ),
                },
                defaultNavigationOptions: {
                  headerTitle: () => <Header />,
                },
              }
            ),
          },
          {
            resetOnBlur: true, // reseta a rota toda vez q ela voltar
            tabBarOptions: {
              keyboardHidesTabBar: true, // faz com que o teclado passo sobre a tab bar
              activeTintColor: '#ee4d64',
              inactiveTintColor: 'rgba(0,0,0,0.3)',
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );