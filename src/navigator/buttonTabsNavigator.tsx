import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './index';
import Transactions from '@/pages/transactions';
import Templates from '@/pages/templates';
import Account from '@/pages/account';
import Icon, { IconNames } from '@/assets/iconfont/index';

export type RootStackParamList = {
  Home: undefined,
  Transactions: undefined,
  Templates: undefined,
  Account: undefined,
}

const Tab = createBottomTabNavigator<RootStackParamList>();

const tabIconRender = (name: IconNames, props: {focused: boolean, color: string, size: number,}) => {
  const {color, size} = props
  return <Icon name={name} color={color} size={size} />
}

export default function buttonTabsNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        lazy
        tabBarOptions={{
          activeTintColor: '#18181B',
          inactiveTintColor: '#4BDDD0',
          labelStyle: {fontSize: 14},
          style:{
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            paddingTop: 15,
            paddingBottom: 15,
            height: 80,
          }
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "首页",
            tabBarIcon: props => tabIconRender('icon-home', props)
          }}
          />
        <Tab.Screen
          name="Transactions"
          component={Transactions}
          options={{
            tabBarLabel: "交易",
            tabBarIcon: props => tabIconRender('icon-jiaoyi', props)
          }}
        />
        <Tab.Screen
          name="Templates"
          component={Templates}
          options={{
            tabBarLabel: "模板",
            tabBarIcon: props => tabIconRender('icon-moban', props)
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarLabel: "我的",
            tabBarIcon: props => tabIconRender('icon-zhanghao', props)
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}