import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from 'native-base';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

const namespace = 'user';

const connector = connect(({user}: RootState) => ({
  profile: user.profile,
}));

type ModelState = ConnectedProps<typeof connector>;

interface AccountProps extends ModelState {}

const Account: React.FC<AccountProps> = ({profile, dispatch}) => {

  const logout = () => {
    dispatch({type: `${namespace}/logout`})
  }

  return (
    <Box bg="white" width="100%" flex={1}>
      <Box pt={getStatusBarHeight() + 20} width="90%" mx="auto">
        <Heading fontSize="4xl" bold color="primary.500" mb={4}>
          Money Tracing
        </Heading>
        <Box shadow={9} bg="red.400" p={4} rounded="xl">
          <HStack alignItems="center" justifyContent="space-between">
            <Avatar size="lg" source={{uri: profile.avatar}}></Avatar>
            <Text fontSize="2xl" ml={2} mt={4} color="white" bold>
              {profile.nickName}
            </Text>
          </HStack>
        </Box>
        <VStack mt={4} space={2}>
          <Button onPress={logout} colorScheme="cyan" _text={{color: 'white'}}>
            退出登录
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default connector(Account);
