import {
  Actionsheet,
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  Text,
} from 'native-base';
import React, {Key, useState} from 'react';
import Icon from '@/assets/iconfont/index';
import { GestureResponderEvent } from 'react-native';

interface NumberActionsheetProps {
  isOpen: boolean;
  onClose: () => void;
  fillNumber: (num: number) => void;
}

const RenderNumberItem = (
  onPress: null | ((event: GestureResponderEvent) => void),
  key?: Key,
  label?: string | number,
  content?: React.ReactElement,
  stylesObj?: {width?: number, height?: number, radius?: string | number, textColor?: string, textSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | number | Array<number> | Array<string> | Record<string, string>, bold?: boolean}
) => {
  return (
    <Button
      key={key}
      _pressed={{bg: 'gray.200'}}
      shadow={1}
      mt={2}
      width={stylesObj?.width || 70}
      height={stylesObj?.height || 70}
      borderRadius={stylesObj?.radius || 70}
      bg="white"
      onPress={onPress}>
      {content || <Text bold={stylesObj?.bold} fontSize={stylesObj?.textSize || '4xl'} color={stylesObj?.textColor}>{label}</Text>}
    </Button>
  );
};

const numArr = [7, 8, 9, 4, 5, 6, 3, 2, 1];

const NumberActionsheet: React.FC<NumberActionsheetProps> = React.memo(
  ({isOpen, onClose, fillNumber}) => {
    const [num, setNum] = useState<string>('');

    const commonNumberSet = (char: string) => setNum(num + char);

    const clear = () => setNum('');

    const deleteLast = () => setNum(num.substring(0, num.length - 1));

    const confirm = () => {
      fillNumber(+num);
      clear();
    };

    return (
      <Actionsheet isOpen={isOpen} onClose={onClose} height={400}>
        <Box height={400} bg="blueGray.200" width="100%" borderTopRadius={20}>
          <Flex
            height={70}
            alignItems="flex-end"
            pr={6}
            justifyContent="center">
            <Text fontSize="4xl">{num}</Text>
          </Flex>
          <Stack
            height={330}
            space={3}
            bg="trueGray.100"
            p={2}
            borderTopRadius={30}>
            <HStack justifyContent="space-evenly">
              <Flex
                direction="row"
                wrap="wrap"
                width="69%"
                justifyContent="space-evenly">
                {numArr.map(num => RenderNumberItem(() => commonNumberSet(num + ''), num, num))}
                {RenderNumberItem(() => commonNumberSet('0'), 0, 0, undefined, {width: 140})}
                {RenderNumberItem(() => commonNumberSet('.'), '.', '.')}
              </Flex>
              <Flex
                direction="column"
                width="23%"
                justifyContent="space-between">
                {RenderNumberItem(clear, undefined, 'C', undefined, {textColor: "#60a5fa"})}
                {RenderNumberItem(deleteLast, undefined, undefined, <Icon name="icon-leftarrow" color="#60a5fa" size={45} />)}
                {RenderNumberItem(confirm, undefined, '确认', undefined, {height: 140, textSize: 'xl', textColor: "#60a5fa", bold: true})}
              </Flex>
            </HStack>
          </Stack>
        </Box>
      </Actionsheet>
    );
  },
);

export default NumberActionsheet;
