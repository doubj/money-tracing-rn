import {ICategory} from '@/models/transaction';
import {
  Box,
  Center,
  Flex,
  Pressable,
  Radio,
  Stack,
  Text,
  VStack,
} from 'native-base';
import React, { useState } from 'react';
import Icon from '@/assets/iconfont/index';

const renderCategoryItem = (
  category: ICategory,
  selectedId: string | undefined,
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

interface CategoryListProps {
  categories: ICategory[];
  selectedCategory: string | undefined;
  onSelect: (selectedCategory: ICategory) => void;
  showTypeRadio?: boolean;
}

const CategoryList: React.FC<CategoryListProps> = React.memo(
  ({categories, selectedCategory, onSelect, showTypeRadio = false}) => {

    const [selectedType, setSelectedType] = useState("expense")

    return (
      <Stack mt={4}>
        <VStack space={4} alignItems="center">
          <Flex
            h={56}
            w="100%"
            direction="row"
            wrap="wrap">
            {categories.filter(category => !showTypeRadio || (showTypeRadio && category.type === selectedType)).map(item =>
              renderCategoryItem(item, selectedCategory, onSelect),
            )}
          </Flex>
          {showTypeRadio && (
            <Radio.Group
              mt={4}
              flexDirection="row"
              name="myRadioGroup"
              value={selectedType}
              onChange={setSelectedType}>
              <Radio colorScheme="teal" accessibilityLabel="expense" value="expense" my={1}>
                支出
              </Radio>
              <Radio colorScheme="teal" accessibilityLabel="income" ml={2} value="income" my={1}>
                收入
              </Radio>
            </Radio.Group>
          )}
        </VStack>
      </Stack>
    );
  },
);

export default CategoryList;
