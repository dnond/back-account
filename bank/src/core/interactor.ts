import { Repository } from "./repository"
import { Presenter } from "./presenter"

export const createInteractor = (repository: Repository, presenter: Presenter) => {
  const deposit = async (depositedMoney: number) => {
    await repository.deposit(depositedMoney)
    const balance = await repository.getBalance()
    presenter.setBalance(balance)
  }

  return { deposit }
}

export type Interactor = ReturnType<typeof createInteractor>
