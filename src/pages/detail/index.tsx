import React, {useState} from 'react';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {RootStackParamList} from '@/navigator/index';
import {RouteProp} from '@react-navigation/native';
import useMessage from '@/utils/use-message';
import dayjs from 'dayjs';
import {wp} from '@/utils/index';
import {BottomTabNavigation} from '@/navigator/buttonTabs';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import Icon from '@/assets/iconfont/index';
import DateTimePicker from '@react-native-community/datetimepicker';
import CategoryModal from './CategoryModal';
import DescModal from "./DescModal"

const connector = connect(({transaction, category}: RootState) => ({
  categories: category.categories,
  transactions: transaction.transactions,
}));

type ModelState = ConnectedProps<typeof connector>;

interface TransactionsDetailProps extends ModelState {
  navigation: BottomTabNavigation;
  route: RouteProp<RootStackParamList, 'Detail'>;
}


const Detail: React.FC<TransactionsDetailProps> = ({
  route,
  categories,
  navigation,
  dispatch,
}) => {
  const detailType = route.params.type;
  const routeDetail = route.params.detail;
  const [detail, setDetail] = useState<any>(routeDetail);
  const [descModalVisible, setDescModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {message, success, error} = useMessage();

  const saveDetail = () => {
    if (requiredCheck()) {
      return;
    }
    if (detail.id) {
      updateDetail();
    } else {
      createDetail();
    }
  };

  const updateDetail = () => {
    dispatch({
      type:
        detailType === 'transaction'
          ? 'transaction/updateTransaction'
          : 'template/updateTemplate',
      payload: detail,
      success: () => {
        success('更新成功');
      },
    });
  };

  const createDetail = () => {
    dispatch({
      type:
        detailType === 'transaction'
          ? 'transaction/createTransaction'
          : 'template/createTemplate',
      payload: {...detail, timestamp: dayjs().valueOf()},
      success: () => {
        success('添加成功');
        goBack();
      },
      fail: () => {
        error('添加失败');
      },
    });
  };

  const requiredCheck = () => {
    const quiredProperties = ['category', 'price', 'date', 'description'];
    const errorMsg = [
      '请选择分类',
      '金额不能为0',
      '请选择日期',
      '请输入具体描述',
    ];
    const result = quiredProperties.some((key, idx) => {
      if (!detail[key]) {
        message(errorMsg[idx]);
        return true;
      }
      return false;
    });
    return result;
  };

  const setDetailPrice = (suffix: number | string) => {
    // 兼顾小数点的情况，应该可以优化下逻辑
    const isDot = typeof suffix === 'string';
    const addDotAllow =
      Number(detail.price) > 0 && !String(detail.price).includes('.');
    if (!detail.price) {
      if (isDot && addDotAllow) {
        setDetail({...detail, price: suffix});
      } else if (!isDot) {
        setDetail({...detail, price: suffix});
      }
    } else {
      if (isDot && addDotAllow) {
        setDetail({
          ...detail,
          price: detail.price + '' + suffix,
        });
      } else if (!isDot) {
        setDetail({
          ...detail,
          price: detail.price + '' + suffix,
        });
      }
    }
  };

  const sliceDetailPrice = () => {
    const strPrice = String(detail.price);
    if (detail.price && strPrice.length > 1) {
      const price = strPrice.slice(0, strPrice.length - 1);
      setDetail({...detail, price});
    } else if (detail.price !== 0) {
      setDetail({...detail, price: 0});
    }
  };

  const goBack = () => {
    setTimeout(() => navigation.goBack(), 0);
  };

  const isToday = dayjs(detail.date).diff(dayjs(new Date()), 'days') === 0;

  const renderNumberItem = (
    label: string | number | Element,
    onPress: () => void,
    onLongPress?: () => void
  ) => {
    return (
      <Pressable
        android_ripple={{color: 'rgba(0, 0, 0, .25)', radius: 45}}
        onPress={onPress}
        onLongPress={onLongPress}>
        <Center width="100px" height="100px">
          <Text fontSize={40}>{label}</Text>
        </Center>
      </Pressable>
    );
  };

  return (
    <Flex bg="#fff" flex={1} alignItems="center">
      <Box
        bg="#EEF2F8"
        width="100%"
        pt={getStatusBarHeight() + 34}
        px={4}
        pb={4}>
        <HStack alignItems="center" justifyContent="space-between">
          <Pressable
            onPress={goBack}
            android_ripple={{color: 'rgba(0, 0, 0, .5)', radius: 16}}>
            <Icon name="icon-leftarrow" color="black" size={32} />
          </Pressable>
          <Text fontSize={24} textAlign="center">
            {detailType === 'transaction' ? '交易' : '模板'}
          </Text>
          <Pressable onPress={() => setShowDatePicker(true)}>
            <Text fontSize={14} color="#717E95" textAlign="center">
              {isToday ? '今天' : detail.date.substr(5, detail.date.length - 1)}
            </Text>
          </Pressable>
        </HStack>
        <Text mt={8} fontSize={18} textAlign="center">
          {`${detail.price} ¥`}
        </Text>
      </Box>
      <ScrollView flex={1} width="100%">
        <Pressable onPress={() => setCategoryModalVisible(true)}>
          <Box width="100%" p={4}>
            <HStack alignItems="center" justifyContent="space-between">
              <HStack>
                <Icon name={detail.category?.icon || 'icon-food'} size={38} />
                <VStack ml={2} justifyContent="center">
                  <Text fontSize={12} color="#717E95">
                    分类
                  </Text>
                  <Text fontWeight={700} fontSize={18}>
                    {detail.category?.name}
                  </Text>
                </VStack>
              </HStack>
              <Box>
                <Icon name={'icon-down'} color="#717E95" size={24} />
              </Box>
            </HStack>
            <Divider mt="4" />
          </Box>
        </Pressable>
        <Pressable onPress={() => setDescModalVisible(true)}>
          <Box width="100%" p={4}>
            <HStack alignItems="center" justifyContent="space-between">
              <VStack ml={2} justifyContent="center">
                <Text fontSize={12} color="#717E95">
                  描述
                </Text>
                <Text fontWeight={700} fontSize={18}>
                  {detail.description}
                </Text>
              </VStack>
              <Box>
                <Icon name={'icon-down'} color="#717E95" size={24} />
              </Box>
            </HStack>
            <Divider mt="4" />
          </Box>
        </Pressable>
        <Center>
          {Array.from({length: 3}, (_, i) => i + 1).map(row => {
            return (
              <Flex direction="row" key={row}>
                {Array.from({length: 3}, (_, i) => i + row * 3 - 2).map(
                  number => (
                    <React.Fragment key={number}>
                      {renderNumberItem(number, () => setDetailPrice(number))}
                    </React.Fragment>
                  ),
                )}
              </Flex>
            );
          })}
          <Flex direction="row">
            {renderNumberItem('.', () => setDetailPrice('.'))}
            {renderNumberItem(0, () => setDetailPrice(0))}
            {renderNumberItem(
              <Center width="100px" height="100px">
                <Icon name="icon-leftarrow" color="black" size={40} />
              </Center>,
              sliceDetailPrice,
              () => setDetail({...detail, price: 0})
            )}
          </Flex>
        </Center>
        <Button
          mb={10}
          mx="auto"
          shadow={9}
          height="60px"
          width={wp(85)}
          bg="#005CEE"
          onPress={saveDetail}>
          保存
        </Button>
        <DescModal
          visible={descModalVisible}
          onClose={() => setDescModalVisible(false)}
          onSave={desc => setDetail({...detail, description: desc})}
        />
        <CategoryModal
          categories={categories}
          defaultCategory={detail.category}
          visible={categoryModalVisible}
          onClose={() => setCategoryModalVisible(false)}
          onSave={category => setDetail({...detail, category})}
        />
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dayjs(detail.date).toDate()}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={(_: Event, date?: Date) => {
              setShowDatePicker(false);
              setDetail({...detail, date: dayjs(date).format('YYYY-MM-DD')});
            }}
          />
        )}
      </ScrollView>
    </Flex>
  );
};

export default connector(Detail);
