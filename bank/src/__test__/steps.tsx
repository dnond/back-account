import { createRepository } from "../core/repository"
import { render, screen, waitFor, within } from "@testing-library/react";
import { App } from "../App";
import { BalanceHistory } from "../core/entities";

export const givenAccountBalanceAndHistories = (initialBalance: number, initialBalanceHistories: BalanceHistory[]) => {
  const repository = createRepository()

  repository.init(initialBalance)
  repository.initBalanceHistories(initialBalanceHistories)
  render(<App repository={repository} />)
}

export const thenAccountBalanceIs = async (expectedBalance: number) => {
  const balanceStatus = screen.getByRole("status")

  await waitFor(() => {
    expect(balanceStatus).toHaveTextContent(expectedBalance.toString())
  })
}

export const thenBalanceHistoryIs = (expectedBalanceHistories: BalanceHistory[]) => {
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
