import { createRepository } from "../core/repository"
import { createPresenter } from "../core/presenter"
import { createInteractor } from "../core/interactor";
import { depositMoney } from "../store/action";
import { createStore } from "../store/store";
import { selectBalance } from "../store/selector";
import { App } from "../App";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";

describe('deposit money', () => {
  it('should deposit money', async () => {
    const steps = createSteps()

    steps.givenAccountBalance(10)
    await steps.whenDepositMoney(10)
    await steps.thenAccountBalanceIs(20)
  })
})

const createSteps = () => {
  const repository = createRepository()
  const presenter = createPresenter()
  const interactor = createInteractor(repository, presenter)
  const store = createStore(repository, presenter)

  const givenAccountBalance = (initialBalance: number) => {
    repository.init(initialBalance)
    render(<App repository={repository} />)
  }

  const whenDepositMoney = async (depositedMoney: number) => {
    const depositInput = screen.getByRole("spinbutton", {name: "deposit"})
    const depositButton = screen.getByRole("button", {name: "save"})
    await userEvent.type(depositInput, depositedMoney.toString())
    await userEvent.click(depositButton)
  }

  const thenAccountBalanceIs = async (expectedBalance: number) => {
    const balanceStatus = screen.getByRole("status")

    await waitFor(() => {
      expect(balanceStatus).toHaveTextContent(expectedBalance.toString())
    })
  }

  return { givenAccountBalance, whenDepositMoney, thenAccountBalanceIs }
}

