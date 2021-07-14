import React from 'react'
import { CardStyleInterpolators, createStackNavigator, HeaderStyleInterpolators, StackNavigationProp } from '@react-navigation/stack';
import { Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ButtonTabs from './buttonTabs';
import Filter from '@/pages/filter';

export type TransactionPropsType = {
  selectedCategory: string | undefined,
  dateRange: (string | undefined)[],
  numberRange: [number | undefined, number | undefined],
  description: string | undefined
}

export type RootStackParamList = {
  ButtonTabs: {
    screen?: string;
    params?: TransactionPropsType;
  },
  Filter: {
    query: TransactionPropsType,
    descriptionAutofocus?: boolean
  },
}

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

export default () => {
  return (
      <NavigationContainer>
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
                  borderBottomWidth: StyleSheet.hairlineWidth
                }
              })
            }
          }}>
          <Stack.Screen options={{headerTitle: '首页', headerShown: false}} name="ButtonTabs" component={ButtonTabs} />
          <Stack.Screen options={{headerTitle: '筛选', headerShown: true}} name="Filter" component={Filter} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}