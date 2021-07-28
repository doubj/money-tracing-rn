import { DvaLoadingState } from 'dva-loading-ts'
import category, { CategoryState } from './category'
import transaction, { TransactionState } from './transaction'
import home, { HomeState } from './home'
import user, { UserState } from './user'
import template, { TemplateState } from './template'

const models = [transaction, category, home, user, template]

export type RootState = {
  transaction: TransactionState,
  category: CategoryState,
  home: HomeState,
  user: UserState,
  template: TemplateState,
  loading: DvaLoadingState
}

export default models