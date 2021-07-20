import React, { useEffect } from 'react'
import { Center, Box } from 'native-base'
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import { RootStackNavigation, RootStackParamList } from '@/navigator/index';
import { RouteProp } from '@react-navigation/native';

const namespace = 'transaction'

const connector = connect(({transaction, category} :RootState) => ({
  categories: category.categories,
  transactions: transaction.transactions
}));

type ModelState = ConnectedProps<typeof connector>

interface TransactionsDetailProps extends ModelState {
  navigation: RootStackNavigation;
  route: RouteProp<RootStackParamList, 'Detail'>;
}

const Detail: React.FC<TransactionsDetailProps> = ({route}) => {
  useEffect(() => {
    console.log(route.params?.detail.id ? "编辑交易记录" : "新增交易记录")
  }, [route])
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
          This is The Detail Page
        </Box>
      </Center>
    </>
  )
}

export default Detail