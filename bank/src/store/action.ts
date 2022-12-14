import { createAsyncThunk } from "@reduxjs/toolkit"
import { Interactor } from "../core/interactor"
import { Presenter } from "../core/presenter"
import { BalanceHistory } from "../core/entities"

export const depositMoney = createAsyncThunk<
  ActionPrefix,
  number,
  { extra: { interactor: Interactor, presenter: Presenter } }
>("account/depositMoney", async (depositedMoney, { extra }) => {
  await extra.interactor.deposit(depositedMoney)

  console.log(extra.presenter.getBalance());


  return {
    balance: extra.presenter.getBalance(),
    balanceHistories: extra.presenter.getBalanceHistories()
  }
})

type ActionPrefix = {
  balance: number,
  balanceHistories: BalanceHistory[]
}

export const withdrawMoney = createAsyncThunk<
  number,
  number,
  { extra: { interactor: Interactor, presenter: Presenter } }
>("account/withdrawMoney", async (withdrawedMoney, { extra }) => {
  await extra.interactor.withdraw(withdrawedMoney)

  return extra.presenter.getBalance()
})
