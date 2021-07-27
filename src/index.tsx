import React from 'react';
import {StatusBar} from 'react-native';
import Navigator from '@/navigator/index';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import '@/config/http';
import store from '@/config/dva';
import {NativeBaseProvider} from 'native-base';
import {RootSiblingParent} from 'react-native-root-siblings';

export default () => {
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <NativeBaseProvider>
          <Navigator />
        </NativeBaseProvider>
      </RootSiblingParent>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
    </Provider>
  );
};
