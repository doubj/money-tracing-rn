import React, { useState } from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import Icon from '@/assets/iconfont/index';
import dayjs from 'dayjs'
import { TouchableOpacity } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import TransactionItem from './transactionItem';
import { RootState } from '@/models/index';
import useMount from '@/utils/use-mount';
import { ITransaction } from '@/models/transaction';

const connector = connect(({transaction} :RootState) => ({
  transactions: transaction.transactions
}));

type ModelState = ConnectedProps<typeof connector>

interface TransactionsProps extends ModelState {}

const namespace = 'transaction'

const Transactions: React.FC<TransactionsProps> = ({transactions, dispatch}) => {

  const [month, setMonth] = useState(dayjs().subtract(1, 'months').format('YYYY-MM'))

  const [loading, setLoading] = useState(false)

  useMount(() => {
    fetchTransactions()
  })

  const fetchTransactions = () => {
    setLoading(true)
    dispatch({type: `${namespace}/fetchTransactions`, cb: () => {setLoading(false)}, payload: {month}})
  }

  const openMonthPickerModal = () => {
    console.log('open month picker modal')
  }

  const toDetail = (id: string) => {
    console.log('press')
  }

  const deleteTransaction = (id: string) => {
    console.log('long press')
  }

  const renderItem = ({item}: ListRenderItemInfo<ITransaction>) => <TransactionItem transaction={item} onPress={toDetail} onLongPress={deleteTransaction} />

  const footer = () => (
    <>
      {
        transactions.length > 0 &&
        <View style={styles.footer}>
          <Text>--已经到底啦--</Text>
        </View>
      }
    </>
  )

  const empty = () =>  (<View style={styles.empty}><Text>暂无数据</Text></View>)

  const keyExtractor = (item: ITransaction) => item.id as string

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>所有交易</Text>
        <TouchableOpacity activeOpacity={0.4} style={styles.monthPicker} onPress={openMonthPickerModal}>
          <Text>{month}</Text>
          <Icon name='icon-down' />
        </TouchableOpacity>
      </View>
      <FlatList
        ListFooterComponent={footer}
        ListEmptyComponent={empty}
        data={transactions}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshing={loading}
        onRefresh={fetchTransactions}
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