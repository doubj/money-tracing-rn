import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '@/pages/home';
import Templates from '@/pages/templates';
import Account from '@/pages/account';
import Icon, { IconNames } from '@/assets/iconfont/index';
import Transactions from '@/pages/transactions';
import { TransactionPropsType } from '.';
import Add from '@/pages/views/add';
import { StackNavigationProp } from '@react-navigation/stack';

export type BottomTabParamList = {
  Home: undefined,
  Transactions: {
    query?: TransactionPropsType,
    reFresh?: boolean
  },
  Add: undefined,
  Templates: undefined,
  Account: undefined,
}

export type BottomTabNavigation = StackNavigationProp<BottomTabParamList>;

const Tab = createBottomTabNavigator<BottomTabParamList>();

const tabIconRender = (name: IconNames, props: {focused: boolean, color: string, size: number,}) => {
  const {color, size} = props
  return <Icon name={name} color={color} size={size} />
}

export default function buttonTabsNavigator() {
  return (
      <Tab.Navigator
        lazy
        tabBarOptions={{
          activeTintColor: '#18181B',
          inactiveTintColor: '#4BDDD0',
          labelStyle: {fontSize: 14},
          style:{
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            height: 50,
          },
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
          name="Add"
          component={Add}
          options={({navigation}) => ({
            tabBarButton: () => {
              return (
              <Add navigation={navigation} />
              )
            }
          })}
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
  );
}