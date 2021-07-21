import React, {useEffect, useState} from 'react';
import {
  Button,
  FormControl,
  HStack,
  Input,
  ScrollView,
  TextArea,
  VStack,
} from 'native-base';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {RootStackNavigation, RootStackParamList} from '@/navigator/index';
import {RouteProp} from '@react-navigation/native';
import CategoryList from '@/components/CategoryList';
import {
  defaultTransaction,
  ICategory,
  ITransaction,
} from '@/models/transaction';
import useMessage from '@/utils/use-message';
import dayjs from 'dayjs'

const namespace = 'transaction';

const connector = connect(({transaction, category}: RootState) => ({
  categories: category.categories,
  transactions: transaction.transactions,
}));

type ModelState = ConnectedProps<typeof connector>;

interface TransactionsDetailProps extends ModelState {
  navigation: RootStackNavigation;
  route: RouteProp<RootStackParamList, 'Detail'>;
}

const Detail: React.FC<TransactionsDetailProps> = ({
  route,
  categories,
  navigation,
  dispatch,
}) => {
  const [detail, setDetail] = useState<any>(defaultTransaction);

  const {message, success, error} = useMessage()

  useEffect(() => {
    if (detail && !detail.id) {
      delete detail.category;
    }
    setDetail(route.params?.detail);
  }, [route]);

  const saveDetail = () => {
    if (requiredCheck()) {
      return;
    }
    if (detail.id) {
      updateDetail()
    } else {
      createDetail()
    }
  };

  const updateDetail = () => {
    dispatch({
      type: `${namespace}/updateTransaction`,
      payload: detail,
      success: () => {
        success("更新成功")
      }
    });
  }

  const createDetail = () => {
    dispatch({
      type: `${namespace}/createTransaction`,
      payload: {...detail, timestamp: dayjs().valueOf()},
      success: () => {
        success("添加成功")
        navigation.goBack()
      },
      fail: () => {
        error("添加失败")
      }
    });
  }

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
        message(errorMsg[idx])
        return true;
      }
      return false;
    });
    return result;
  };

  const deleteDetail = () => {
    dispatch({
      type: `${namespace}/deleteTransaction`,
      payload: detail,
      success: () => {
        success("删除成功")
        navigation.goBack()
      }
    });
  };

  return (
    <ScrollView flex={1} bg="white">
      <VStack space={4} px={4} pb={4}>
        <CategoryList
          categories={categories}
          selectedCategory={detail.category?.id}
          showTypeRadio={true}
          onSelect={(category: ICategory) => setDetail({...detail, category})}
        />
        <FormControl>
          <FormControl.Label
            _text={{color: 'muted.700', fontSize: 'xl', fontWeight: 600}}>
            金额
          </FormControl.Label>
          <Input
            defaultValue={detail.price + ''}
            onChange={({nativeEvent: {text: price}}) => {
              setDetail({...detail, price: +price});
            }}
            keyboardType="numeric"
          />
        </FormControl>
        <FormControl>
          <FormControl.Label
            _text={{color: 'muted.700', fontSize: 'xl', fontWeight: 600}}>
            时间
          </FormControl.Label>
          <Input defaultValue={detail.date} />
        </FormControl>
        <FormControl>
          <FormControl.Label
            _text={{color: 'muted.700', fontSize: 'xl', fontWeight: 600}}>
            描述
          </FormControl.Label>
          <TextArea
            defaultValue={detail.description}
            onChange={({nativeEvent: {text: description}}) => {
              setDetail({...detail, description});
            }}
            h={20}
            placeholder="消费相关信息"
          />
        </FormControl>
        <HStack justifyContent="center">
          <Button width="40%" borderRadius={20} onPress={saveDetail}>
            {detail.id ? "更新" : "添加"}
          </Button>
          {detail.id && <Button
            colorScheme="red"
            _text={{color: 'white'}}
            width="40%"
            borderRadius={20}
            ml={4}
            onPress={deleteDetail}>
            删除
          </Button>}
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default connector(Detail);
