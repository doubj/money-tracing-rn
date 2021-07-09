import { DvaLoadingState } from 'dva-loading-ts'
import transaction, { TransactionState } from './transaction'

const models = [transaction]

export type RootState = {
  transaction: TransactionState,
  loading: DvaLoadingState
}

export default models