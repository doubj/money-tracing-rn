import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import {Platform, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import ButtonTabs from './buttonTabs';
import Filter from '@/pages/filter';
import Detail from '@/pages/detail';
import {ITransaction} from '@/models/transaction';
import useMount from '@/utils/use-mount';
import SplashScreen from 'react-native-splash-screen';
import Login from '@/pages/login';
import {navigationRef} from '../utils';
import { ITemplate } from '@/models/template';

export type TransactionPropsType = {
  selectedCategory: string | undefined;
  dateRange: (string | undefined)[];
  numberRange: [number | undefined, number | undefined];
  description: string | undefined;
};

export type RootStackParamList = {
  Login: undefined;
  ButtonTabs: undefined;
  Filter: {
    query: TransactionPropsType;
    descriptionAutofocus?: boolean;
  };
  Detail: {
    detail: ITransaction | ITemplate;
    type: 'transaction' | 'template';
  };
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

export default () => {
  useMount(() => {
    SplashScreen.hide();
  });

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        mode="card"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerStyle: {
            ...Platform.select({
              android: {
                elevation: 0,
                borderBottomWidth: StyleSheet.hairlineWidth,
              },
            }),
          },
        }}>
        <Stack.Screen
          options={{headerTitle: '登录', headerShown: false}}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{headerTitle: '首页', headerShown: false}}
          name="ButtonTabs"
          component={ButtonTabs}
        />
        <Stack.Screen
          options={{headerTitle: '筛选', headerShown: true}}
          name="Filter"
          component={Filter}
        />
        <Stack.Screen
          options={{headerTitle: '详情', headerShown: false}}
          name="Detail"
          component={Detail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
