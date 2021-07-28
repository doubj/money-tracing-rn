import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from 'native-base';
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import React, { useState } from 'react';
import { IUser } from '@/models/user';
import { NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import useMount from '@/utils/use-mount';

const namespace = 'user'

const connector = connect((_) => ({
}));

type ModelState = ConnectedProps<typeof connector>;

interface LoginProps extends ModelState {}

const Login: React.FC<LoginProps> = ({dispatch}) => {

  useMount(() => {
    dispatch({type: `${namespace}/checkLogin`})
  })

  const [user, setUser] = useState<IUser>({userName: '', password: ''})

  const login = () => {
    dispatch({type: `${namespace}/login`, payload: user})
  }

  return (
    <Box bg="white" width="100%" flex={1}>
      <Box bg="white" pt={getStatusBarHeight() + 50} width="90%" mx="auto">
        <Text fontSize="6xl" bold color="primary.500">
          Money Tracing
        </Text>
        <Heading color="muted.400" size="xs">
          {"powered by doubj:)"}
        </Heading>

        <VStack space={2} mt={5}>
          <FormControl>
            <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
              用户名
            </FormControl.Label>
            <Input onChange={({nativeEvent: {text}}: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {setUser({...user, userName: text})}} />
            <Text mt={1} color="muted.400" fontSize="sm">账号：admin</Text>
          </FormControl>
          <FormControl mb={5}>
            <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
              密码
            </FormControl.Label>
            <Input type="password" onChange={({nativeEvent: {text}}: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {setUser({...user, password: text})}} />
            <Text mt={1} color="muted.400" fontSize="sm">密码：admin123</Text>
            <Link
              _text={{fontSize: 'xs', fontWeight: '700', color: 'cyan.500'}}
              alignSelf="flex-end"
              mt={1}>
              忘记密码?
            </Link>
          </FormControl>
          <VStack space={2}>
            <Button onPress={login} colorScheme="cyan" _text={{color: 'white'}}>
              登录
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default connector(Login);
