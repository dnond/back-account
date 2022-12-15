import { Repository } from "./repository"
import { Presenter } from "./presenter"

export const createInteractor = (repository: Repository, presenter: Presenter) => {
  const deposit = async (depositedMoney: number) => {
    await repository.deposit(depositedMoney)
    const balance = await repository.getBalance()
    const balanceHistories = await repository.getBalanceHistories()
    presenter.setBalance(balance)
    presenter.setBalanceHistories(balanceHistories)
  }

  const withdraw = async (withdrawedMoney: number) => {
    await repository.withdraw(withdrawedMoney)
    const balance = await repository.getBalance()
    const balanceHistories = await repository.getBalanceHistories()
    presenter.setBalance(balance)
    presenter.setBalanceHistories(balanceHistories)
  }

  return { deposit, withdraw }
}

export type Interactor = ReturnType<typeof createInteractor>
