import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import Icon from '@/assets/iconfont/index';
import { wp } from '@/utils/index';
import { ITransaction } from '@/models/transaction';

interface TransactionItemProps {
  transaction: ITransaction,
  onPress: (transaction: ITransaction) => void,
  onLongPress: (id: string) => void
}

const TransactionItem: React.FC<TransactionItemProps> = React.memo(({transaction, onPress, onLongPress}) => {
  const {id, category, price, date, description} = transaction
  const getClass = () => category.type === 'expense' ? styles.expense : styles.income
  const getPrice = () => `${category.type === 'expense' ? '-' : '+'}${price} ¥`

  return (
    <>
      <Pressable android_ripple={{color: '#7DD3FC'}} style={styles.transactionWrapper} onLongPress={() => onLongPress(id as string)} onPress={() => onPress(transaction)} >
        <View style={styles.icon}>
          <Icon name={category.icon} size={38} />
        </View>
        <View style={styles.left}>
          <Text style={styles.mainInfo}>{category.name}</Text>
          <Text style={styles.metaItem} numberOfLines={1}>{description}</Text>
        </View>
        <View style={styles.right}>
          <Text style={[styles.mainInfo, getClass()]}>{getPrice()}</Text>
          <Text style={styles.metaItem}>{date}</Text>
        </View>
      </Pressable>
    </>
  )
})

const styles = StyleSheet.create({
  transactionWrapper: {
    width: wp(98),
    marginTop: 5,
    marginLeft: wp(1),
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  icon: {
    width: '15%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  left: {
    paddingRight: 10,
    width: '50%',
  },
  right: {
    width: "35%",
    display: 'flex',
    alignItems: 'flex-end'
  },
  category: {
    marginLeft: 10
  },
  mainInfo: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  metaItem: {
    fontSize: 14,
    marginTop: 5,
    color: '#737373'
  },
  expense: {
    color: '#f87171'
  },
  income: {
    color: '#4ade80'
  }
})

export default TransactionItem