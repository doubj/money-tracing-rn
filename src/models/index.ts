import transaction from './transaction'

const models = [transaction]

export type RootState = {
  transaction: typeof transaction.state
}

export default models