import React, { useState } from 'react'
import { ListRenderItemInfo, NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native'
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import Icon from '@/assets/iconfont/index';
import { connect, ConnectedProps } from 'react-redux';
import TransactionItem from './transactionItem';
import { RootState } from '@/models/index';
import useMount from '@/utils/use-mount';
import { ITransaction } from '@/models/transaction';
import { Flex, Text, Box, Input, Center, FlatList, Pressable } from 'native-base';
import { wp } from '@/utils/index';
import Dialog from '@/components/Dialog';
import { RootStackNavigation } from '@/navigator/index';

const connector = connect(({transaction, loading} :RootState) => ({
  transactions: transaction.transactions,
  hasMore: transaction.pagination.hasMore,
  loading: loading.effects[namespace + '/fetchTransactions']
}));

type ModelState = ConnectedProps<typeof connector>

interface TransactionsProps extends ModelState {
  navigation: RootStackNavigation;
}

const namespace = 'transaction'

const Transactions: React.FC<TransactionsProps> = ({transactions, dispatch, loading, hasMore, navigation}) => {

  const [refresh, setRefresh] = useState(false)

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const [deleteId, setDeleteId] = useState("-1")

  useMount(() => {
    dispatch({type: `${namespace}/fetchTransactions`})
  })

  const fetchMore = () => {
    dispatch({type: `${namespace}/fetchTransactions`, payload: { loadMore: true }})
  }

  const onRefresh = () => {
    if (loading || refresh) {
      return
    }
    setRefresh(true)
    dispatch({type: `${namespace}/fetchTransactions`, cb: () => {setRefresh(false)}})
  }

  const toDetail = (id: string) => {
    console.log('press')
  }

  const openDialog = (id: string) => {
    setShowDeleteDialog(true)
    setDeleteId(id)
  }

  const deleteTransaction = () => {
    console.log('delete transaction id is ' + deleteId)
    setShowDeleteDialog(false)
  }

  const renderItem = ({item}: ListRenderItemInfo<ITransaction>) => <TransactionItem transaction={item} onPress={toDetail} onLongPress={openDialog} />

  const footer = () => {
    if (refresh) {
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

  const empty = () =>  (<Center height={200} width="100%"><Text>暂无数据</Text></Center>)

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
          <Input
            variant="outline"
            width={wp(55)}
            height={10}
            placeholder="描述"
            fontSize={12}
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            onSubmitEditing={({nativeEvent: {text}}: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {console.log(text)}}
          />
          {/* #2563EB focus on */}
          <Pressable padding={2} android_ripple={{color: '#7DD3FC'}} onPress={() => navigation.navigate("Filter")}>
            <Icon name='icon-shaixuan' size={24} />
          </Pressable>
        </Flex>
      </Box>
      <Dialog
        title={"删除"}
        content={"确定要删除吗? 该操作无法撤销."}
        isOpen={showDeleteDialog}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={deleteTransaction}
      />
      {/* FlatList重复渲染，导致update很慢 */}
      <FlatList
        ListFooterComponent={footer}
        ListEmptyComponent={empty}
        data={transactions}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshing={refresh}
        onRefresh={onRefresh}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.2}
      />
    </>
  )
}

export default connector(Transactions)