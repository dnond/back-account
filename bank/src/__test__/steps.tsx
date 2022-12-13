import { createRepository } from "../core/repository"
import { render, screen, waitFor } from "@testing-library/react";
import { App } from "../App";

export const givenAccountBalance = (initialBalance: number) => {
  const repository = createRepository()

  repository.init(initialBalance)
  render(<App repository={repository} />)
}

export const thenAccountBalanceIs = async (expectedBalance: number) => {
  const balanceStatus = screen.getByRole("status")

  await waitFor(() => {
    expect(balanceStatus).toHaveTextContent(expectedBalance.toString())
  })
}
