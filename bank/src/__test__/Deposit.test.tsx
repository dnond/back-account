import { describe, it, expect } from "vitest"
import { createRepository, Repository } from "../core/repository"
import { createPresenter, Presenter } from "../core/presenter"
import { createInteractor, Interactor } from "../core/interactor"
import { depositMoney } from "../store/action"
import { accountSlice } from "../store/slice"
import { configureStore, combineReducers, createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { createStore, RootState } from "../store/store"
import { selectBalance } from "../store/selector"

describe('deposit money', () => {
  it('should deposit money', async () => {
    const steps = createSteps()

    steps.givenAccountBalance(10)
    await steps.whenDepositMoney(10)
    steps.thenAccountBalanceIs(20)
  })
})

const createSteps = () => {
  const repository = createRepository()
  const presenter = createPresenter()
  const interactor = createInteractor(repository, presenter)
  const store = createStore(repository, presenter)

  const givenAccountBalance = (initialBalance: number) => {
    repository.init(initialBalance)
  }

  const whenDepositMoney = async (depositedMoney: number) => {
    await store.dispatch(depositMoney(depositedMoney))
  }

  const thenAccountBalanceIs = (expectedBalance: number) => {
    const balance = selectBalance(store.getState())

    expect(balance).toBe(expectedBalance)
  }

  return { givenAccountBalance, whenDepositMoney, thenAccountBalanceIs }
}
