import { DvaLoadingState } from 'dva-loading-ts'
import category, { CategoryState } from './category'
import transaction, { TransactionState } from './transaction'
import home, { HomeState } from './home'

const models = [transaction, category, home]

export type RootState = {
  transaction: TransactionState,
  category: CategoryState,
  home: HomeState,
  loading: DvaLoadingState
}

export default models