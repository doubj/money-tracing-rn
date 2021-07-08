import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import Icon from '@/assets/iconfont/index';
import { wp } from '@/utils/index';
import { ITransaction } from '@/models/transaction';

interface TransactionItemProps {
  transaction: ITransaction,
  onPress: (id: string) => void,
  onLongPress: (id: string) => void
}

const TransactionItem: React.FC<TransactionItemProps> = ({transaction, onPress, onLongPress}) => {
  const {id, category, price, date, description} = transaction
  const getClass = () => category.type === 'expense' ? styles.expense : styles.income
  const getPrice = () => `${category.type === 'expense' ? '-' : '+'}${price} ¥`

  return (
    <>
      <Pressable android_ripple={{color: '#7DD3FC'}} style={styles.transactionWrapper} onLongPress={() => onLongPress(id as string)} onPress={() => onPress(id as string)} >
        <View style={styles.icon}>
          <Icon name={category.icon} size={50} />
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
}

const styles = StyleSheet.create({
  transactionWrapper: {
    width: wp(95),
    marginTop: 20,
    marginLeft: wp(2.5),
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 10,
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
    paddingHorizontal: 10,
    width: '60%',
  },
  right: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  category: {
    marginLeft: 10
  },
  mainInfo: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  metaItem: {
    fontSize: 14,
    marginTop: 5,
    color: '#737373'
  },
  expense: {
    color: '#DC2626'
  },
  income: {
    color: '#22C55E'
  }
})

export default TransactionItem