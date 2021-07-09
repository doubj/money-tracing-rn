import React, { useState } from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native'
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import Icon from '@/assets/iconfont/index';
import dayjs from 'dayjs'
import { TouchableOpacity } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import TransactionItem from './transactionItem';
import { RootState } from '@/models/index';
import useMount from '@/utils/use-mount';
import { ITransaction } from '@/models/transaction';
import { Flex, Text, AlertDialog, Button } from 'native-base';

const connector = connect(({transaction, loading} :RootState) => ({
  transactions: transaction.transactions,
  hasMore: transaction.pagination.hasMore,
  loading: loading.effects[namespace + '/fetchTransactions']
}));

type ModelState = ConnectedProps<typeof connector>

interface TransactionsProps extends ModelState {}

const namespace = 'transaction'

const Transactions: React.FC<TransactionsProps> = ({transactions, dispatch, loading, hasMore}) => {

  const [month, setMonth] = useState(dayjs().format('YYYY-MM'))

  const [refresh, setRefresh] = useState(false)

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

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

  const deleteTransaction = (id: string) => {
    setShowDeleteDialog(true)
  }

  const renderItem = ({item}: ListRenderItemInfo<ITransaction>) => <TransactionItem transaction={item} onPress={toDetail} onLongPress={deleteTransaction} />

  const footer = () => {
    if (!hasMore) {
      return (<>{<View style={styles.footer}><Text>--已经到底啦--</Text></View>}</>)
    }
    if (hasMore && loading && transactions.length > 0) {
      return (<>{<View style={styles.footer}><Text>加载中...</Text></View>}</>)
    }
    return <></>
  }

  const empty = () =>  (<View style={styles.empty}><Text>暂无数据</Text></View>)

  const keyExtractor = (item: ITransaction) => item.id as string

  const cancelRef = React.useRef();

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>所有交易</Text>
        <Flex direction="row" justifyContent="space-between" mt="3">
          <TouchableOpacity activeOpacity={0.4} onPress={() => setMonth(dayjs(month).subtract(1, "months").format("YYYY-MM"))}>
            <Icon name='icon-leftarrow' size={24} />
          </TouchableOpacity>
          <Text fontSize='lg' fontWeight='bold'>{month}</Text>
          <TouchableOpacity activeOpacity={0.4} onPress={() => setMonth(dayjs(month).add(1, "months").format("YYYY-MM"))}>
            <Icon name='icon-Rightarrow' size={24} />
          </TouchableOpacity>
        </Flex>
      </View>
      <AlertDialog isOpen={showDeleteDialog} leastDestructiveRef={cancelRef} onClose={() => setShowDeleteDialog(false)}>
        <AlertDialog.Content>
          <AlertDialog.Header>
            <Text fontSize="lg" fontWeight="bold">
              删除
            </Text>
          </AlertDialog.Header>
          <AlertDialog.Body>
            确定要删除吗? 该操作无法撤销.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button py={2} px={6} borderRadius={30} ref={cancelRef} onPress={() => setShowDeleteDialog(false)}>
              取消
            </Button>
            <Button py={2} px={6} borderRadius={30} colorScheme="danger" _text={{color: 'white'}} onPress={() => setShowDeleteDialog(false)} ml={3}>
              删除
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
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

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight() + 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#18181B'
  },
  monthPicker: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 100,
  },
})

export default connector(Transactions)