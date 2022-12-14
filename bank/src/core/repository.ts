import { BalanceHistory } from "./entities"

export const createRepository = () => {
  let inMemoryBalance: number
  let inMemoryBalanceHistories: BalanceHistory[] = []

  const init = (initialBalance: number) => {
    inMemoryBalance = initialBalance
  }

  const initBalanceHistories = (initialBalanceHistories: BalanceHistory[]) => {
    inMemoryBalanceHistories = initialBalanceHistories
  }

  const deposit = async (depositedMoney: number) => {
    inMemoryBalance = inMemoryBalance + depositedMoney
    inMemoryBalanceHistories = [
      ...inMemoryBalanceHistories,
      {
        date: new Date("2022/12/14"),
        transaction: depositedMoney,
        currentBalance: inMemoryBalance
      }
    ]

    return Promise.resolve()
  }

  const withdraw = async (withdrawedMoney: number) => {
    inMemoryBalance = inMemoryBalance - withdrawedMoney

    return Promise.resolve()
  }

  const getBalance = async () => {
    return Promise.resolve(inMemoryBalance)
  }

  const getBalanceHistories = async () => {
    return Promise.resolve(inMemoryBalanceHistories)
  }

  return { init, initBalanceHistories, deposit, withdraw, getBalance, getBalanceHistories }
}

export interface Repository {
  deposit: (depositedMoney: number) => Promise<void>
  withdraw: (withdrawedMoney: number) => Promise<void>
  getBalance: () => Promise<number>
  getBalanceHistories: () => Promise<BalanceHistory[]>
}