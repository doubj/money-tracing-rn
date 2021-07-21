import React, {useState} from 'react';
import {
  Text,
  Flex,
  Input,
  Button,
  useDisclose,
  useToast,
  ScrollView,
} from 'native-base';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackNavigation, RootStackParamList} from '@/navigator/index';
import {ICategory} from '@/models/transaction';
import DateRangePicker from 'react-native-daterange-picker';
import moment from 'moment';
import NumberActionsheet from '@/components/NumberActionsheet';
import { NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { hp } from '@/utils/index';
import {useHeaderHeight} from '@react-navigation/stack';
import CategoryList from '@/components/CategoryList';
import useMessage from '@/utils/use-message';

const connector = connect(({category}: RootState) => ({
  categories: category.categories,
}));

type ModelState = ConnectedProps<typeof connector>;

interface FilterProps extends ModelState {
  navigation: RootStackNavigation;
  route: RouteProp<RootStackParamList, 'Filter'>;
}

const Filter: React.FC<FilterProps> = ({categories, navigation, route}) => {
  const {isOpen, onOpen, onClose} = useDisclose();

  const headerHeight = useHeaderHeight()

  const {message} = useMessage();

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(route.params.query.selectedCategory);

  const [numberFocus, setNumberFocus] = useState<-1 | 0 | 1>(-1);

  const [numberRange, setNumberRange] = useState<
    [number | undefined, number | undefined]
  >(route.params.query.numberRange);

  const [dateObj, setDateObj] = useState<{
    startDate: moment.Moment | undefined;
    endDate: moment.Moment | undefined;
    displayedDate: moment.Moment;
  }>({
    startDate: route.params.query.dateRange[0] ? moment(route.params.query.dateRange[0]) : undefined,
    endDate: route.params.query.dateRange[1] ? moment(route.params.query.dateRange[1]) : undefined,
    displayedDate: moment()});

  const [description, setDescription] = useState<string | undefined>(route.params.query.description)

  const descriptionAutofocus = route.params.descriptionAutofocus

  const reset = () => {
    setDateObj({startDate: undefined, endDate: undefined, displayedDate: moment()})
    setDescription(undefined)
    setNumberRange([undefined, undefined])
    setSelectedCategory(undefined)
  };

  const confirm = () => {
    const dateRange = [
      dateObj.startDate && dateObj.startDate.format('YYYY-MM-DD'),
      dateObj.endDate && dateObj.endDate.format('YYYY-MM-DD'),
    ];
    navigation.navigate('ButtonTabs', {
      screen: 'Transactions',
      params: {selectedCategory, dateRange, numberRange, description},
    });
  };

  const openByMin = () => {
    openNumberSlide(0);
  };

  const openByMax = () => {
    openNumberSlide(1);
  };

  const openNumberSlide = (focusON: 0 | 1) => {
    onOpen();
    setNumberFocus(focusON);
  };

  const fillNumber = (num: number) => {
    onClose();
    if (numberFocus === 0) {
      setNumberRange([
        num,
        numberRange[1] && num > numberRange[1] ? undefined : numberRange[1],
      ]);
    } else if (numberFocus === 1) {
      if (numberRange[0] && num < numberRange[0]) {
        message(`请输入比${numberRange[0]}￥大的金额`)
      } else {
        setNumberRange([numberRange[0], num]);
      }
    }
    setNumberFocus(-1);
  };

  return (
    <>
      <ScrollView flex={1} bg="white">
        <Flex minHeight={hp(100) - headerHeight} direction="column" alignItems="center">
          <CategoryList categories={categories} selectedCategory={selectedCategory} onSelect={({id}: ICategory) => setSelectedCategory(id)} />
          <DateRangePicker
            onChange={(datas: any) => {
              setDateObj({...dateObj, ...datas});
            }}
            {...dateObj}
            range>
            <Flex
              mt={8}
              direction="row"
              alignItems="center"
              justifyContent="center">
              <Text
                width="42%"
                fontSize="2xl"
                pb={1}
                pl={1}
                color={dateObj.startDate ? '' : 'trueGray.400'}
                borderBottomWidth={1}
                borderBottomColor="warmGray.300">
                {dateObj.startDate?.format('YYYY-MM-DD') || '开始时间'}
              </Text>
              <Text fontSize="2xl" mx={2}>
                ~
              </Text>
              <Text
                width="42%"
                fontSize="2xl"
                pb={1}
                pl={1}
                color={dateObj.endDate ? '' : 'trueGray.400'}
                borderBottomWidth={1}
                borderBottomColor="gray.300">
                {dateObj.endDate?.format('YYYY-MM-DD') || '结束时间'}
              </Text>
            </Flex>
          </DateRangePicker>
          <Flex
            px={3}
            mt={4}
            direction="row"
            alignItems="center"
            justifyContent="center">
            <Text
              onPress={openByMin}
              width="42%"
              fontSize="2xl"
              pb={1}
              pl={1}
              color={numberRange[0] ? 'dark.100' : 'trueGray.400'}
              borderBottomWidth={1}
              borderBottomColor={
                numberFocus === 0 ? 'cyan.400' : 'trueGray.300'
              }>
              {numberRange[0] ? `${numberRange[0]} ¥` : '最小金额'}
            </Text>
            <Text fontSize="2xl" mx={2}>
              ~
            </Text>
            <Text
              onPress={openByMax}
              width="42%"
              fontSize="2xl"
              pb={1}
              pl={1}
              color={numberRange[1] ? 'dark.100' : 'trueGray.400'}
              borderBottomWidth={1}
              borderBottomColor={
                numberFocus === 1 ? 'cyan.400' : 'trueGray.300'
              }>
              {numberRange[1] ? `${numberRange[1]} ¥` : '最大金额'}
            </Text>
          </Flex>
            <Input
              size="2xl"
              mt={2}
              variant="underlined"
              width="88%"
              defaultValue={description}
              autoFocus={descriptionAutofocus}
              placeholder="描述"
              onChange={({nativeEvent: {text}}: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {setDescription(text)}}
            />
          <Flex mt={8} direction="row" alignItems="center">
            <Button
              width="40%"
              colorScheme="teal"
              borderRadius={20}
              onPress={reset}>
              重置
            </Button>
            <Button width="40%" borderRadius={20} ml={4} onPress={confirm}>
              确认
            </Button>
          </Flex>
        </Flex>
      </ScrollView>
      <NumberActionsheet
        isOpen={isOpen}
        onClose={() => {
          onClose()
          setNumberFocus(-1)
        }}
        fillNumber={fillNumber}
      />
    </>
  );
};

export default connector(Filter);
