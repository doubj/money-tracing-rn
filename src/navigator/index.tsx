import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator, HeaderStyleInterpolators, StackNavigationProp } from '@react-navigation/stack';
import Home from '@/pages/home'
import Detail from '@/pages/home/detail'
import { Platform, StyleSheet } from 'react-native';

export type RootStackParamList = {
  Home: undefined,
  Detail: {id: string}
}

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

export default () => {
  return (
    <>
      {/* <NavigationContainer> */}
        <Stack.Navigator
          headerMode={'none'}
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
          }} initialRouteName="Home">
          <Stack.Screen options={{headerTitle: '首页'}} name="Home" component={Home} />
          <Stack.Screen options={{headerTitle: '详情'}} name="Detail" component={Detail} />
        </Stack.Navigator>
      {/* </NavigationContainer> */}
    </>
  )
}