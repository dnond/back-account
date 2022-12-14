import { BalanceHistory } from './entities'

export const createPresenter = () => {
  const account = new Map<string, number | BalanceHistory[]>([['balance', 0], ['balanceHistories', []]])

  const setBalance = (balance: number) => {
    account.set('balance', balance)
  }

  const getBalance = () => {
    const balance = account.get('balance')

    if (Number.isInteger(balance)) {
      return balance as number
    }

    throw "Balance is not Number"
  }

  const setBalanceHistories = (balanceHistories: BalanceHistory[]) => {
    account.set('balanceHistories', balanceHistories)
  }

  const getBalanceHistories = () => {
    const balanceHistories = account.get('balanceHistories')

    return balanceHistories as BalanceHistory[]
  }

  return { setBalance, getBalance, setBalanceHistories, getBalanceHistories }
}

export type Presenter = ReturnType<typeof createPresenter>


