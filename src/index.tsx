import React from 'react';
import { StatusBar } from 'react-native';
import Navigator from '@/navigator/buttonTabsNavigator';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux'
import store from '@/config/dva'
import { NativeBaseProvider } from 'native-base';
import '@/config/http';

export default () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Navigator />
        <StatusBar
            backgroundColor="transparent"
            barStyle="dark-content"
            translucent
        />
      </NativeBaseProvider>
    </Provider>
  )
}