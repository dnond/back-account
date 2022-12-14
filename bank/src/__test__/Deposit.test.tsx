import userEvent from "@testing-library/user-event";
import { screen, render, within } from "@testing-library/react";
import { BalanceHistory } from "../core/entities";
import { givenAccountBalance, thenAccountBalanceIs } from "./steps";
import { createRepository } from "../core/repository";
import { App } from "../App";

describe('deposit money', () => {
  it('should deposit money', async () => {
    givenAccountBalanceAndHistories(10, [{
      date: new Date('2022/12/13'),
      transaction: 10,
      currentBalance: 10,
    }])
    await whenDepositMoney(10)
    await thenAccountBalanceIs(20)

    thenBalanceHistoryIs([{
      date: new Date('2022/12/13'),
      transaction: 10,
      currentBalance: 10,
    },
    {
      date: new Date('2022/12/14'),
      transaction: 10,
      currentBalance: 20,
    }])
  })
})

export const givenAccountBalanceAndHistories = (initialBalance: number, initialBalanceHistories: BalanceHistory[]) => {
  const repository = createRepository()

  repository.init(initialBalance)
  repository.initBalanceHistories(initialBalanceHistories)
  render(<App repository={repository} />)
}

const whenDepositMoney = async (depositedMoney: number) => {
  const depositInput = await screen.findByRole("spinbutton", {name: "deposit"})
  const depositButton = await screen.findByRole("button", {name: "save"})
  await userEvent.type(depositInput, depositedMoney.toString())
  await userEvent.click(depositButton)
}

const thenBalanceHistoryIs = (expectedBalanceHistories: BalanceHistory[]) => {
  const columns = screen.getAllByRole('columnheader')
  const rows = screen.getAllByRole('row')
  const firstRowCells = within(rows[1]).getAllByRole('cell')
  const secondRowCells = within(rows[2]).getAllByRole('cell')

  expect(columns[0]).toHaveTextContent("Date")
  expect(columns[1]).toHaveTextContent("Transaction")
  expect(columns[2]).toHaveTextContent("Balance")

  expect(firstRowCells[0]).toHaveTextContent(expectedBalanceHistories[0].date.toString())
  expect(firstRowCells[1]).toHaveTextContent(expectedBalanceHistories[0].transaction.toString())
  expect(firstRowCells[2]).toHaveTextContent(expectedBalanceHistories[0].currentBalance.toString())

  expect(secondRowCells[0]).toHaveTextContent(expectedBalanceHistories[1].date.toString())
  expect(secondRowCells[1]).toHaveTextContent(expectedBalanceHistories[1].transaction.toString())
  expect(secondRowCells[2]).toHaveTextContent(expectedBalanceHistories[1].currentBalance.toString())
}

