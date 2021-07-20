import {wp} from '@/utils/index';
import { Divider, HStack, Popover, Pressable, Stack, Text,VStack} from 'native-base';
import React, {useRef, useState} from 'react';
import Icon from '@/assets/iconfont/index';
import {Animated, StyleSheet} from 'react-native';
import { RootStackNavigation } from '@/navigator/index';
import { defaultTransaction } from '@/models/transaction';

interface AddProps {
  navigation: RootStackNavigation;
}

const Add: React.FC<AddProps> = ({navigation}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [show, setShow] = useState(false)

  const togglePopover = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(scaleAnim, {toValue: 0.85, duration: 30, useNativeDriver: true}),
        Animated.timing(scaleAnim, {toValue: 1, duration: 20,  useNativeDriver: true}),
      ]),
      Animated.timing(rotateAnim, {toValue: show ? 0 : 45, duration: 200, useNativeDriver: true})
    ]).start()
    setShow(!show)
  };

  const toTransactionDetail = () => {
    togglePopover()
    navigation.navigate("Detail", {detail: defaultTransaction, type: 'transaction'})
  }

  return (
    <>
      <Popover
        placement="top"
        isOpen={show}
        offset={5}
        onOpen={togglePopover}
        onClose={togglePopover}
        trigger={triggerProps => {
          return (
            <Pressable
              {...triggerProps}
              style={styles.addButtonWrapper}>
              <Animated.View
                style={[styles.addButton, {transform: [{scale: scaleAnim}]}]}>
                <Animated.View
                  style={{transform: [{rotate: rotateAnim.interpolate({inputRange: [0, 45], outputRange: ["0deg", "45deg"]})}]}}>
                  <Icon name="icon-tianjia" color="#fff" size={20} />
                </Animated.View>
              </Animated.View>
            </Pressable>
          );
        }}>
        <Popover.Content borderRadius="xl" bg="white">
          <Popover.Arrow />
          <Popover.Body>
            <Stack direction="row" >
              <HStack space={4} alignItems="center">
                <Pressable onPress={toTransactionDetail}>
                  <VStack alignItems="center">
                    <Icon name="icon-jiaoyi1" color="#4BDDD0" size={35} />
                    <Text fontSize={12} color="darkText">添加记录</Text>
                  </VStack>
                </Pressable>
                <Divider orientation="vertical" height="8" />
                <VStack alignItems="center">
                  <Icon name="icon-moban1" color="#4BDDD0" size={35} />
                  <Text fontSize={12} color="darkText">创建模板</Text>
                </VStack>
              </HStack>
            </Stack>
          </Popover.Body>
        </Popover.Content>
      </Popover>
    </>
  );
};

const BUTTON_WIDTH = 40;

const styles = StyleSheet.create({
  addButtonWrapper: {
    height: 50,
    width: wp(20),
    paddingVertical: 5,
    alignItems: 'center',
  },
  addButton: {
    width: BUTTON_WIDTH,
    height: BUTTON_WIDTH,
    borderRadius: 10,
    backgroundColor: '#4BDDD0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Add;
