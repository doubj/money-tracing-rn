import React from 'react';
import { StatusBar } from 'react-native';
import Navigator from '@/navigator/buttonTabsNavigator';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux'
import store from '@/config/dva'
import '@/config/http';

export default () => {
  return (
    <Provider store={store}>
      <Navigator />
      <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
        />
    </Provider>
  )
}