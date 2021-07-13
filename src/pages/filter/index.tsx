import React, {useState} from 'react';
import {
  Center,
  Box,
  Text,
  Flex,
  Pressable,
  Input,
  Button,
  useDisclose,
  useToast,
} from 'native-base';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackNavigation} from '@/navigator/index';
import Icon from '@/assets/iconfont/index';
import {ICategory} from '@/models/transaction';
import DateRangePicker from 'react-native-daterange-picker';
import moment from 'moment';
import useMount from '@/utils/use-mount';
import NumberActionsheet from '@/components/NumberActionsheet';
import { NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';

const connector = connect(({category}: RootState) => ({
  categories: category.categories,
}));

type ModelState = ConnectedProps<typeof connector>;

interface FilterProps extends ModelState {
  navigation: RootStackNavigation;
}

const renderItem = (
  category: ICategory,
  selectedId: string,
  onPress: (selectedCategory: ICategory) => void,
) => {
  return (
    <Pressable
      android_ripple={{color: '#14b8a6'}}
      key={category.id}
      onPress={() => onPress(category)}>
      <Box
        p={1}
        border={1}
        borderColor="teal.500"
        borderRadius="xl"
        size={20}
        bg={selectedId === category.id ? 'teal.400' : ''}>
        <Center flex={1}>
          <Icon name={category.icon} size={20} />
          <Text color="darkText" noOfLines={1}>
            {category.name}
          </Text>
        </Center>
      </Box>
    </Pressable>
  );
};

const Filter: React.FC<FilterProps> = ({categories, navigation}) => {
  const {isOpen, onOpen, onClose} = useDisclose();

  const toast = useToast();

  const [selectedCategory, setSelectedCategory] = useState('');

  const [numberFocus, setNumberFocus] = useState<-1 | 0 | 1>(-1);

  const [numberRange, setNumberRange] = useState<
    [number | null, number | null]
  >([null, null]);

  const [dateObj, setDateObj] = useState<{
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
    displayedDate: moment.Moment;
  }>({startDate: null, endDate: null, displayedDate: moment()});

  const [description, setDescription] = useState<string | null>(null)

  useMount(() => {
    // 接收query
  });

  const reset = () => {
    setDateObj({startDate: null, endDate: null, displayedDate: moment()})
    setDescription(null)
    setNumberRange([null, null])
    setSelectedCategory('')
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
        numberRange[1] && num > numberRange[1] ? null : numberRange[1],
      ]);
    } else if (numberFocus === 1) {
      if (numberRange[0] && num < numberRange[0]) {
        toast.show({
          title: `请输入比${numberRange[0]}￥大的金额`,
          placement: 'top',
        });
      } else {
        setNumberRange([numberRange[0], num]);
      }
    }
    setNumberFocus(-1);
  };

  return (
    <>
      <Box flex={1} bg="white">
        <Flex direction="column" alignItems="center">
          <Flex
            mt={4}
            w="100%"
            direction="row"
            wrap="wrap"
            alignItems="center"
            justifyContent="center">
            {categories.map(item =>
              renderItem(item, selectedCategory, ({id}: ICategory) =>
                setSelectedCategory(id),
              ),
            )}
          </Flex>
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
                color={dateObj.startDate ? '' : 'trueGray.400'}
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
              color={numberRange[0] ? 'black' : 'trueGray.400'}
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
              color={numberRange[1] ? 'black' : 'trueGray.400'}
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
            placeholder="描述"
            onSubmitEditing={({nativeEvent: {text}}: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {setDescription(text)}}
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
      </Box>
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
