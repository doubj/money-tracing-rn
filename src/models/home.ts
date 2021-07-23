import { ITransaction } from './transaction';
import axios from 'axios';
import { Effect, Model, SubscriptionsMapObject } from 'dva-core-ts';
import { Reducer } from 'redux';
import { numberTransfer } from '../utils';
import dayjs from 'dayjs'

export interface HomeState {
  totalBalance: number,
  transactions: ITransaction[]
}

interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  reducers: {
    setState: Reducer<HomeState>
  },
  effects: {
    fetchTotalBalance: Effect,
    fetchTransaction: Effect
  }
}

const initialState: HomeState = {
  totalBalance: 0,
  transactions: []
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
    *fetchTransaction(_, {call, put}) {
      const formatStr = "YYYY-MM-DD"
      const params = {
        date_$gte: dayjs().subtract(7, "days").format(formatStr),
        date_$lt: dayjs().format(formatStr),
      }
      const { list } = yield call(axios.get, "/record", {params})
      yield put({
        type: 'setState',
        payload: {
          transactions: list,
        }
      })
    }
  }
}

export default homeModel

