import { Effect, Model } from 'dva-core-ts'
import { Reducer } from 'redux';
import axios from 'axios'
import { IconNames } from '@/assets/iconfont';
import dayjs from 'dayjs'

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

interface TransactionState {
  transactions: ITransaction[]
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
  transactions: []
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
    *fetchTransactions({cb, payload}, {call, put}) {
      const month = payload?.month || dayjs().format('YYYY-MM')
      const { list } = yield call(axios.get, TRANSACTION_URL, {
        params: {
          'date_like': month
        }
      })
      yield put({
        type: 'setState',
        payload: {
          transactions: list
        }
      })
      if(typeof cb === 'function') {
        cb();
      }
    }
  }
}

export default transactionModel