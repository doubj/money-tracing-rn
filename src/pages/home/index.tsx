import React from 'react';
import {RootStackNavigation} from '@/navigator/index';
import {Box, Center} from 'native-base';

interface HomeProps {
  navigation: RootStackNavigation;
}

const Home: React.FC<HomeProps> = ({navigation}) => {
  return (
    <>
      <Center flex={1}>
        <Box
          bg="primary.400"
          p={4}
          _text={{
            fontSize: 'md',
            fontWeight: 'bold',
            color: 'white',
          }}>
          This is The Home Page
        </Box>
      </Center>
    </>
  );
};

export default Home;
