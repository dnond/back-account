export const createRepository = () => {
  let inMemoryBalance: number

  const init = (initialBalance: number) => {
    inMemoryBalance = initialBalance
  }

  const deposit = async (depositedMoney: number) => {
    inMemoryBalance = inMemoryBalance + depositedMoney

    return Promise.resolve()
  }

  const getBalance = async () => {
    return Promise.resolve(inMemoryBalance)
  }

  return { init, deposit, getBalance }
}

export interface Repository {
  deposit: (depositedMoney: number) => Promise<void>
  getBalance: () => Promise<number>
}