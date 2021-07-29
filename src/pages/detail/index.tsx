import React, {useState} from 'react';
import {
  Button,
  FormControl,
  HStack,
  Input,
  ScrollView,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {RootStackParamList} from '@/navigator/index';
import {RouteProp} from '@react-navigation/native';
import CategoryList from '@/components/CategoryList';
import {ICategory} from '@/models/transaction';
import useMessage from '@/utils/use-message';
import dayjs from 'dayjs';
import DateRangePicker from 'react-native-daterange-picker';
import moment from 'moment';
import {hp} from '@/utils/index';
import {useHeaderHeight} from '@react-navigation/stack';
import {BottomTabNavigation} from '@/navigator/buttonTabs';

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
  const headerHeight = useHeaderHeight();

  const [dateObj, setDateObj] = useState<{
    date: moment.Moment;
    displayedDate: moment.Moment;
  }>({date: moment(routeDetail.date), displayedDate: moment()});

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
      type: detailType === 'transaction' ? "transaction/updateTransaction" : "template/updateTemplate",
      payload: detail,
      success: () => {
        success('更新成功');
      },
    });
  };

  const createDetail = () => {
    dispatch({
      type: detailType === 'transaction' ? "transaction/createTransaction" : "template/createTemplate",
      payload: {...detail, timestamp: dayjs().valueOf()},
      success: () => {
        success('添加成功');
        navigation.navigate(detailType === 'transaction' ? 'Transactions' : 'Templates');
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

  const deleteDetail = () => {
    dispatch({
      type: detailType === 'transaction' ? "transaction/deleteTransaction" : "template/deleteTemplate",
      payload: detail,
      success: () => {
        success('删除成功');
        navigation.navigate(detailType === 'transaction' ? 'Transactions' : 'Templates');
      },
    });
  };

  return (
    <ScrollView flex={1} bg="white">
      <VStack space={4} px={4} pb={4} minHeight={hp(100) - headerHeight}>
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
        <DateRangePicker
          onChange={(datas: any) => {
            setDateObj({...dateObj, ...datas});
            if (datas.date) {
              setDetail({...detail, date: datas.date.format('YYYY-MM-DD')});
            }
          }}
          {...dateObj}>
          <FormControl>
            <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'xl', fontWeight: 600}}>
              时间
            </FormControl.Label>
            <Text
              width="100%"
              fontSize="md"
              py={4}
              pl={3}
              rounded="md"
              color="black"
              borderWidth={1}
              borderColor="gray.300">
              {dateObj.date.format('YYYY-MM-DD')}
            </Text>
          </FormControl>
        </DateRangePicker>
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
            placeholder="相关描述信息"
          />
        </FormControl>
        {detailType === 'template' && (
          <FormControl>
            <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'xl', fontWeight: 600}}>
              备注
            </FormControl.Label>
            <TextArea
              defaultValue={detail.remark}
              onChange={({nativeEvent: {text: remark}}) => {
                setDetail({...detail, remark});
              }}
              h={20}
              placeholder="备注信息"
            />
          </FormControl>
        )}
        <HStack justifyContent="center">
          <Button width="40%" borderRadius={20} onPress={saveDetail}>
            {detail.id ? '更新' : '添加'}
          </Button>
          {detail.id && (
            <Button
              colorScheme="red"
              _text={{color: 'white'}}
              width="40%"
              borderRadius={20}
              ml={4}
              onPress={deleteDetail}>
              删除
            </Button>
          )}
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default connector(Detail);
