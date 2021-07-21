import React, { useState } from 'react'
import { ListRenderItemInfo } from 'react-native'
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import Icon from '@/assets/iconfont/index';
import { connect, ConnectedProps } from 'react-redux';
import TransactionItem from './transactionItem';
import { RootState } from '@/models/index';
import useMount from '@/utils/use-mount';
import { ICategory, ITransaction } from '@/models/transaction';
import { Flex, Text, Box, Center, FlatList, Pressable, Button, SmallCloseIcon } from 'native-base';
import { wp } from '@/utils/index';
import Dialog from '@/components/Dialog';
import { RootStackNavigation, RootStackParamList, TransactionPropsType } from '@/navigator/index';
import { RouteProp } from '@react-navigation/native';
import { useEffect } from 'react';
import useMessage from '@/utils/use-message';

const QueryList = (query: TransactionPropsType, categories: ICategory[], setQuery: React.Dispatch<React.SetStateAction<TransactionPropsType>>) => {

  const renderItem = (label: string, onPress: () => void) => {
    return (
      <>
        <Button onPress={onPress} mr={2} mt={2} _text={{color: "white"}} _pressed={{bg: "indigo.300"}} px={4} py={2} rounded="xl" bg="indigo.400">
          {label}
        </Button>
      </>
    )
  }

  const {selectedCategory, dateRange, numberRange} = query
  return (
    <Flex direction="row" wrap="wrap">
      {selectedCategory && renderItem(categories.find(item => item.id === selectedCategory)?.name as string, () => setQuery({...query, selectedCategory: undefined}))}
      {(dateRange[0] || dateRange[1]) && renderItem(`${dateRange[0] || ''} ~ ${dateRange[1] || ''} `, () => setQuery({...query, dateRange: [undefined, undefined]}))}
      {(numberRange[0] || numberRange[1]) && renderItem(`${numberRange[0] || '-∞'}￥ ~ ${numberRange[1] || '+∞'}￥ `, () => setQuery({...query, numberRange: [undefined, undefined]}))}
    </Flex>
  )
}

const namespace = 'transaction'

const connector = connect(({transaction, loading, category} :RootState) => ({
  categories: category.categories,
  transactions: transaction.transactions,
  hasMore: transaction.pagination.hasMore,
  loading: loading.effects[namespace + '/fetchTransactions']
}));

type ModelState = ConnectedProps<typeof connector>

interface TransactionsProps extends ModelState {
  navigation: RootStackNavigation;
  route: RouteProp<RootStackParamList, 'ButtonTabs'>;
}

const Transactions: React.FC<TransactionsProps> = ({transactions, categories, dispatch, loading, hasMore, navigation, route}) => {

  const [refresh, setRefresh] = useState(false)

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const [deleteId, setDeleteId] = useState("-1")

  const {success} = useMessage()

  const [query, setQuery] = useState<TransactionPropsType>({
    selectedCategory: undefined,
    numberRange: [undefined, undefined],
    dateRange: [undefined, undefined],
    description: undefined
  })

  const queryParams = {
    category: query.selectedCategory,
    date_$gte: query.dateRange[0],
    date_$lt: query.dateRange[1],
    price_$gte: query.numberRange[0],
    price_$lte: query.numberRange[1],
    description_like: query.description
  }

  useMount(() => {
    dispatch({type: `${namespace}/fetchTransactions`})
  })

  useEffect(() => {
    if(route && route.params){
      // ???????????????????????????????????????????
      const params = {
        category: (route.params as any).selectedCategory,
        date_$gte: (route.params as any).dateRange[0],
        date_$lt: (route.params as any).dateRange[1],
        price_$gte: (route.params as any).numberRange[0],
        price_$lte: (route.params as any).numberRange[1],
        description_like: (route.params as any).description
      }
      setQuery(route.params as TransactionPropsType)
      dispatch({type: `${namespace}/fetchTransactions`, payload: {params}})
    }
  }, [route.params])

  const fetchMore = () => {
    if (!hasMore) {
      return
    }
    dispatch({type: `${namespace}/fetchTransactions`, payload: { loadMore: true, params: queryParams }})
  }

  const onRefresh = () => {
    if (loading || refresh) {
      return
    }
    setRefresh(true)
    dispatch({type: `${namespace}/fetchTransactions`, payload: { params: queryParams }, cb: () => {setRefresh(false)}})
  }

  const toDetail = (transaction: ITransaction) => {
    navigation.navigate("Detail", {detail: transaction, type: 'transaction'})
  }

  const openDialog = (id: string) => {
    setShowDeleteDialog(true)
    setDeleteId(id)
  }

  const deleteTransaction = () => {
    // TODO删除完后跳转card navigation会有bug
    setShowDeleteDialog(false)
    dispatch({
      type: `${namespace}/deleteTransaction`,
      payload: {id: deleteId},
      success: () => {
        success("删除成功")
        onRefresh()
      }
    });
  }

  const renderItem = ({item}: ListRenderItemInfo<ITransaction>) => <TransactionItem transaction={item} onPress={toDetail} onLongPress={openDialog} />

  const footer = () => {
    if (refresh || transactions.length === 0) {
      return <></>
    }
    if (!hasMore) {
      return (<>{<Center py={2}><Text>--已经到底啦--</Text></Center>}</>)
    }
    if (hasMore && loading && transactions.length > 0) {
      return (<>{<Center py={2}><Text>加载中...</Text></Center>}</>)
    }
    return <></>
  }

  const empty = () =>  (<Center height={400} width="100%"><Text>暂无数据</Text></Center>)

  const keyExtractor = (item: ITransaction) => item.id as string

  return (
    <>
      <Box
        bg="white"
        shadow={2}
        roundedBottomLeft={20}
        roundedBottomRight={20}
        width="100%"
        pt={getStatusBarHeight() + 20}
        pl={4}
        pr={4}
        pb={4}
      >
        <Flex direction="row" alignItems="center" justifyContent="space-between">
          <Text bold>所有交易</Text>
          <Button
            variant="outline"
            width={wp(55)}
            height={10}
            py={0}
            px={3}
            endIcon={query.description ? <SmallCloseIcon color="indigo.400" onPress={() => setQuery({...query, description: undefined})} /> : <></>}
            _pressed={{bg: "trueGray.50", borderColor: "cyan.400"}}
            _text={{color: query.description ? "dark.400" : "blueGray.400"}}
            justifyContent="space-between"
            onPress={() => navigation.navigate("Filter", {query, descriptionAutofocus: true})}
          >
            {query.description || "描述"}
          </Button>
          <Pressable padding={2} android_ripple={{color: '#7DD3FC'}} onPress={() => navigation.navigate("Filter", {query})}>
            <Icon name='icon-shaixuan' size={24} />
          </Pressable>
        </Flex>
        {query && QueryList(query, categories, setQuery)}
      </Box>
      <Dialog
        title={"删除"}
        content={"确定要删除吗? 该操作无法撤销."}
        isOpen={showDeleteDialog}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={deleteTransaction}
      />
      <FlatList
        ListFooterComponent={footer}
        ListEmptyComponent={empty}
        data={transactions}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshing={refresh}
        onRefresh={onRefresh}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.1}
      />
    </>
  )
}

export default connector(Transactions)