import React, {useState} from 'react';
import {RootStackNavigation} from '@/navigator/index';
import {Box, Center, Divider, Flex, Text, View, VStack} from 'native-base';
import {numberTransfer, viewportWidth} from '@/utils/index';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import LineCartView, {LineCartViewProps} from './LineChartView';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import useMount from '@/utils/use-mount';
import {useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {BottomTabNavigation} from '@/navigator/buttonTabs';
import {ITransaction} from '@/models/transaction';
import Icon from '@/assets/iconfont/index';

const namespace = 'home';

const connector = connect(({home}: RootState) => ({
  totalBalance: home.totalBalance,
  transactionsInSevenDays: home.transactionsInSevenDays,
  lastFiveTransactions: home.lastFiveTransactions,
}));

type ModelState = ConnectedProps<typeof connector>;

interface HomeProps extends ModelState {
  navigation: BottomTabNavigation;
}

const renderItem = (item: ITransaction) => {
  const {category, description, price, date} = item;

  return (
    <Box
      py={2}
      px={2}
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      key={item.id}
      flexDirection="row">
      <Center width="10%">
        <Icon name={category.icon} size={24} />
      </Center>
      <VStack width="50%">
        <Text bold>{category.name}</Text>
        <Text fontSize="sm" color="#737373" noOfLines={1}>
          {description}
        </Text>
      </VStack>
      <VStack width="40%" alignItems="flex-end">
        <Text
          color={category.type === 'expense' ? 'red.400' : 'green.400'}
          bold>
          {`${category.type === 'expense' ? '-' : '+'}${price} ￥`}
        </Text>
        <Text fontSize="sm" color="#737373">
          {date}
        </Text>
      </VStack>
    </Box>
  );
};

const Home: React.FC<HomeProps> = ({
  navigation,
  totalBalance,
  dispatch,
  transactionsInSevenDays,
  lastFiveTransactions,
}) => {
  const [lineChartState, setLineChartState] = useState<LineCartViewProps>({
    xDatas: [],
    yDatas: [],
    width: viewportWidth - 10,
  });

  useMount(() => {
    dispatch({type: `${namespace}/fetchTotalBalance`});
    dispatch({type: `${namespace}/fetchTransactionInSevenDays`});
    dispatch({type: `${namespace}/fetchLastFiveTransactions`});
  });

  useEffect(() => {
    const valueMap: {[key: string]: number} = {};
    transactionsInSevenDays.forEach((item: ITransaction) => {
      if (item.category.type === 'expense') {
        let {date, price} = item;
        date = date.substring(5).replace('-', '/');
        valueMap[date] = valueMap[date]
          ? numberTransfer(valueMap[date] + price)
          : price;
      }
    });
    setLineChartState({
      ...lineChartState,
      xDatas: Object.keys(valueMap).reverse(),
      yDatas: Object.keys(valueMap)
        .map(key => valueMap[key])
        .reverse(),
    });
  }, [transactionsInSevenDays]);

  return (
    <Flex flex={1} alignItems="center">
      <Box
        bg="white"
        shadow={2}
        roundedBottomLeft={20}
        roundedBottomRight={20}
        width="100%"
        pt={getStatusBarHeight() + 20}
        px={4}
        pb={4}>
        <Flex>
          <Text fontSize="2xl" color="red.400" bold>
            Money Tracing
          </Text>
          <Text
            fontSize="xs"
            color="gray.400"
            mt={4}
            bold>{`Keep going and you will become better`}</Text>
        </Flex>
      </Box>
      <ScrollView>
        <Flex pb={1}>
          <Box
            bg="white"
            mt={16}
            rounded="xl"
            width={viewportWidth - 5}
            height={350}
            alignItems="center">
            <Box
              bg="blue.400"
              mt={-12}
              rounded="xl"
              width="98%"
              h={24}
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              px={6}>
              <Text color="white" fontSize="2xl" bold letterSpacing={2}>
                总收支
              </Text>
              <Text color="white" fontSize="2xl" bold>
                {`￥${totalBalance}`}
              </Text>
            </Box>
            <Text mt={3} fontSize="md" color="blueGray.400" bold>
              近七天支出
            </Text>
            {lineChartState.xDatas.length === 0 ? (
              <Center mt={24}>
                <Text fontSize={12} color="gray.400">近七天还没有支出哦🥺</Text>
                <Text fontSize={12} color="gray.400">快去添加一项收支记录一下吧！~</Text>
              </Center>
            ) : (
              <LineCartView {...lineChartState} />
            )}
          </Box>
          <Box bg="white" mt={4} rounded="xl" px={1} width={viewportWidth - 5}>
            <Box
              flexDirection="row"
              py={2}
              px={2}
              alignItems="center"
              justifyContent="space-between">
              <Text fontSize="md" color="blue.400" bold>
                交易记录
                <Text fontSize="xs" color="gray.400">
                  {'(近五次)'}
                </Text>
              </Text>
              <Text
                onPress={() => navigation.navigate('Transactions', {})}
                fontSize="sm"
                color="red.400"
                letterSpacing={1}
                bold
                underline>
                所有
              </Text>
            </Box>
            <Divider px={2} />
            <VStack width="100%">{lastFiveTransactions.map(renderItem)}</VStack>
          </Box>
        </Flex>
      </ScrollView>
    </Flex>
  );
};

export default connector(Home);
