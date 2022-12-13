export const createRepository = () => {
  let inMemoryBalance: number

  const init = (initialBalance: number) => {
    inMemoryBalance = initialBalance
  }

  const deposit = async (depositedMoney: number) => {
    inMemoryBalance = inMemoryBalance + depositedMoney

    return Promise.resolve()
  }

  const withdraw = async (withdrawedMoney: number) => {
    inMemoryBalance = inMemoryBalance - withdrawedMoney

    return Promise.resolve()
  }

  const getBalance = async () => {
    return Promise.resolve(inMemoryBalance)
  }

  return { init, deposit, withdraw, getBalance }
}

export interface Repository {
  deposit: (depositedMoney: number) => Promise<void>
  withdraw: (withdrawedMoney: number) => Promise<void>
  getBalance: () => Promise<number>
}