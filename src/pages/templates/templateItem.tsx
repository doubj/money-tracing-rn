import {ITemplate} from '@/models/template';
import Icon from '@/assets/iconfont/index';
import {
  Box,
  Center,
  Divider,
  HStack,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import React from 'react';

interface TemplateItemProps {
  template: ITemplate;
  handlerEdit: (template: ITemplate) => void;
  handlerTransfer: (template: ITemplate) => void;
  handlerDelete: (template: ITemplate) => void;
}

const TemplateItem: React.FC<TemplateItemProps> = React.memo(
  ({template, handlerEdit, handlerTransfer, handlerDelete}) => {
    const {category, description, remark, price} = template;
    return (
      <Box mb={2} width="95%" px={4} py={2} mx="auto" bg="white" rounded="xl">
        <HStack>
          <Center width="15%">
            <Icon name={category.icon} size={38} />
          </Center>
          <VStack width="45%">
            <Text fontSize="lg" bold>
              {category.name}
            </Text>
            <Text fontSize="sm" color="#737373" noOfLines={1}>
              {description}
            </Text>
          </VStack>
          <VStack width="40%" alignItems="flex-end">
            <Text
              fontSize="lg"
              color={category.type === 'expense' ? 'red.400' : 'green.400'}
              bold>
              {`${category.type === 'expense' ? '-' : '+'}${price} ￥`}
            </Text>
            <Text fontSize="sm" color="#737373" noOfLines={1}>
              {remark}
            </Text>
          </VStack>
        </HStack>
        <Divider my={1} />
        <HStack>
          <Center py={1} flex={1}>
            <Pressable onPress={() => handlerEdit(template)} flexDirection="row">
              <Icon name="icon-edit" />
              <Text fontSize="sm">编辑</Text>
            </Pressable>
          </Center>
          <Divider orientation="vertical" />
          <Center flexDirection="row" py={1} flex={1}>
            <Pressable onPress={() => handlerTransfer(template)} flexDirection="row">
              <Icon name="icon-icon_richeng_btn_transfer" />
              <Text fontSize="sm">生成记录</Text>
            </Pressable>
          </Center>
          <Divider orientation="vertical" />
          <Center flexDirection="row" py={1} flex={1}>
            <Pressable onPress={() => handlerDelete(template)} flexDirection="row">
              <Icon name="icon-Delete" />
              <Text fontSize="sm">删除</Text>
            </Pressable>
          </Center>
        </HStack>
      </Box>
    );
  },
);

export default TemplateItem;
