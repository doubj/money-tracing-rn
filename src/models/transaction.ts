import { Effect, Model } from 'dva-core-ts'
import { Reducer } from 'redux';
import axios from 'axios'
import { IconNames } from '@/assets/iconfont';
import { RootState } from '.';

const TRANSACTION_URL = '/record'

export interface ITransaction {
  id?: string;
  date: string;
  timestamp: number;
  price: number;
  description: string;
  category: ICategory;
};

export interface ICategory {
  id: string;
  name: string;
  icon: IconNames;
  type: 'expense' | 'income';
}

export interface TransactionState {
  transactions: ITransaction[],
  pagination: {
    _page: number,
    _limit: number,
    total: number,
    hasMore: boolean
  }
}

interface TransactionModel extends Model {
  namespace: 'transaction';
  state: TransactionState,
  reducers: {
    setState: Reducer<TransactionState>
  },
  effects: {
    fetchTransactions: Effect
  }
}

// {id: '1', date: '2020-07-07', timestamp: 100, description: '111', price: 50, category: {id: '1', name:'餐饮', icon: 'icon-food', type: 'expense'}}

const initialState: TransactionState = {
  transactions: [],
  pagination: {
    _page: 1,
    _limit: 10,
    total: 0,
    hasMore: true
  }
}

const transactionModel: TransactionModel = {
  namespace: 'transaction',
  state: initialState,
  reducers: {
    setState(state = initialState, {payload}) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    *fetchTransactions({payload, cb}, {call, put, select}) {
      const { transactions, pagination } = yield select((state: RootState) => state.transaction)
      const { _page: curPage, _limit } = pagination
      let _page = 1
      const loadMore = payload && payload.loadMore
      if (loadMore) {
        _page = curPage + 1
      }
      const { list, total } = yield call(axios.get, TRANSACTION_URL, {
        params: {
          _page,
          _limit
        }
      })
      const newTransactions = loadMore ? transactions.concat(list) : list
      yield put({
        type: 'setState',
        payload: {
          transactions: newTransactions,
          pagination: {
            _page,
            _limit,
            total,
            hasMore: total > newTransactions.length
          }
        }
      })
      if (typeof cb === 'function') {
        cb()
      }
    }
  }
}

export default transactionModel