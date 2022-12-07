export const createPresenter = () => {
  const account = new Map([['balance', 0]])

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

  return { setBalance, getBalance }
}

export type Presenter = ReturnType<typeof createPresenter>


