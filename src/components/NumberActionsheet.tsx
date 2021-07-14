import {
  Actionsheet,
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  Text,
} from 'native-base';
import React, {useState} from 'react';
import Icon from '@/assets/iconfont/index';
import { GestureResponderEvent } from 'react-native';

interface RenderNumberItemProps {
  onPress: null | ((event: GestureResponderEvent) => void),
  label?: string | number,
  content?: React.ReactElement,
  width?: number,
  height?: number,
  buttonRadius?: string | number,
  textColor?: string,
  textSize?:'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | number | Array<number> | Array<string> | Record<string, string>,
  bold?: boolean
}

const RenderNumberItem: React.FC<RenderNumberItemProps> = (props) => {
  const {onPress, label, content, width, height, buttonRadius, textColor, textSize, bold} = props
  return (
    <Button
      _pressed={{bg: 'gray.200'}}
      shadow={1}
      mt={2}
      width={width || 70}
      height={height || 70}
      borderRadius={buttonRadius || 70}
      bg="white"
      onPress={onPress}>
      {content || <Text bold={bold} fontSize={textSize || '4xl'} color={textColor}>{label}</Text>}
    </Button>
  );
};

const numArr = [7, 8, 9, 4, 5, 6, 3, 2, 1];

interface NumberActionsheetProps {
  isOpen: boolean;
  onClose: () => void;
  fillNumber: (num: number) => void;
}
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
                {numArr.map(num => <RenderNumberItem onPress={() => commonNumberSet(num + '')} key={num} label={num} />)}
                <RenderNumberItem
                  onPress={() => commonNumberSet('0')}
                  label={0}
                  width={140}
                />
                <RenderNumberItem
                  onPress={() => commonNumberSet('.')}
                  label={'.'}
                />
              </Flex>
              <Flex
                direction="column"
                width="23%"
                justifyContent="space-between">
                <RenderNumberItem
                  onPress={clear}
                  label={'C'}
                  textColor={"#60a5fa"}
                />
                <RenderNumberItem
                  onPress={deleteLast}
                  content={<Icon name="icon-leftarrow" color="#60a5fa" size={45} />}
                />
                <RenderNumberItem
                  onPress={confirm}
                  label={'确认'}
                  textColor={"#60a5fa"}
                  textSize={"xl"}
                  height={140}
                  bold
                />
              </Flex>
            </HStack>
          </Stack>
        </Box>
      </Actionsheet>
    );
  },
);

export default NumberActionsheet;
