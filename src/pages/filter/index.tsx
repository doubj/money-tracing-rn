import React from 'react'
import { Center, Box } from 'native-base'
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { RootStackNavigation } from '@/navigator/index';
import useMount from '@/utils/use-mount';

const connector = connect(({category} :RootState) => ({
  categories: category.categories,
}));

type ModelState = ConnectedProps<typeof connector>

interface FilterProps extends ModelState {
  navigation: RootStackNavigation;
}

const Filter: React.FC<FilterProps> = ({categories}) => {

  useMount(() => {
    console.log(categories)
  })

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
          This is The Filter Page
        </Box>
      </Center>
    </>
  )
}

export default connector(Filter)