import { createAsyncThunk } from "@reduxjs/toolkit"
import { Interactor } from "../core/interactor"
import { Presenter } from "../core/presenter"
import { BalanceHistory } from "../core/entities"

type ActionPrefix = {
  balance: number,
  balanceHistories: BalanceHistory[]
}

export const depositMoney = createAsyncThunk<
  ActionPrefix,
  number,
  { extra: { interactor: Interactor, presenter: Presenter } }
>("account/depositMoney", async (depositedMoney, { extra }) => {
  await extra.interactor.deposit(depositedMoney)

  return {
    balance: extra.presenter.getBalance(),
    balanceHistories: extra.presenter.getBalanceHistories()
  }
})

export const withdrawMoney = createAsyncThunk<
  ActionPrefix,
  number,
  { extra: { interactor: Interactor, presenter: Presenter } }
>("account/withdrawMoney", async (withdrawedMoney, { extra }) => {
  await extra.interactor.withdraw(withdrawedMoney)

  return {
    balance: extra.presenter.getBalance(),
    balanceHistories: extra.presenter.getBalanceHistories()
  }
})
