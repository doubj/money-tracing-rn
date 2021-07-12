import { DvaLoadingState } from 'dva-loading-ts'
import category, { CategoryState } from './category'
import transaction, { TransactionState } from './transaction'

const models = [transaction, category]

export type RootState = {
  transaction: TransactionState,
  category: CategoryState,
  loading: DvaLoadingState
}

export default models