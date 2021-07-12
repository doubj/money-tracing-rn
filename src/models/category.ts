import { ICategory } from './transaction';
import { Reducer } from 'redux';
import { Effect, Model, SubscriptionsMapObject } from 'dva-core-ts';
import axios from 'axios';

export interface CategoryState {
  categories: ICategory[]
}

interface CategoryModel extends Model {
  namespace: 'category';
  state: CategoryState;
  reducers: {
    setState: Reducer<CategoryState>
  },
  effects: {
    fetchCategories: Effect
  }
  subscriptions: SubscriptionsMapObject;
}

const initialState: CategoryState = {
  categories: []
}

const CATEGORY_URL = '/category'

const categoryModel: CategoryModel = {
  namespace: 'category',
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
    *fetchCategories(_, {call, put}) {
      const categories = yield call(axios.get, CATEGORY_URL)
      yield put({
        type: 'setState',
        payload: {
          categories,
        }
      })
    }
  },
  subscriptions: {
    setup({dispatch}) {
      dispatch({type: 'fetchCategories'})
    }
  }
}

export default categoryModel