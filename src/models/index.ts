import { DvaLoadingState } from 'dva-loading-ts'
import category, { CategoryState } from './category'
import transaction, { TransactionState } from './transaction'
import home, { HomeState } from './home'
import user, { UserState } from './user'

const models = [transaction, category, home, user]

export type RootState = {
  transaction: TransactionState,
  category: CategoryState,
  home: HomeState,
  user: UserState,
  loading: DvaLoadingState
}

export default models