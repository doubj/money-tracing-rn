import { ITransaction } from './transaction';
import axios from 'axios';
import { Effect, Model, SubscriptionsMapObject } from 'dva-core-ts';
import { Reducer } from 'redux';
import { numberTransfer } from '../utils';
import dayjs from 'dayjs'

export interface HomeState {
  totalBalance: number,
  transactionsInSevenDays: ITransaction[]
  lastFiveTransactions: ITransaction[]
}

interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  reducers: {
    setState: Reducer<HomeState>
  },
  effects: {
    fetchTotalBalance: Effect,
    fetchTransactionInSevenDays: Effect,
    fetchLastFiveTransactions: Effect
  }
}

const initialState: HomeState = {
  totalBalance: 0,
  transactionsInSevenDays: [],
  lastFiveTransactions: []
}

const homeModel: HomeModel = {
  namespace: 'home',
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
    *fetchTotalBalance(_, {call, put}) {
      const result = yield call(axios.get, "/record/total")
      yield put({
        type: 'setState',
        payload: {
          totalBalance: numberTransfer(result.balance),
        }
      })
    },
    *fetchTransactionInSevenDays(_, {call, put}) {
      const formatStr = "YYYY-MM-DD"
      const params = {
        date_$gte: dayjs().subtract(7, "days").format(formatStr),
        date_$lt: dayjs().format(formatStr),
      }
      const { list } = yield call(axios.get, "/record", {params})
      yield put({
        type: 'setState',
        payload: {
          transactionsInSevenDays: list,
        }
      })
    },
    *fetchLastFiveTransactions(_, {call, put}) {
      const { list } = yield call(axios.get, "/record", {params: {_page: 1, _limit: 5}})
      yield put({
        type: 'setState',
        payload: {
          lastFiveTransactions: list,
        }
      })
    }
  }
}

export default homeModel

