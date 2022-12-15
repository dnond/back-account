import userEvent from "@testing-library/user-event";
import { screen, render, within } from "@testing-library/react";
import { givenAccountBalanceAndHistories, thenAccountBalanceIs, thenBalanceHistoryIs } from "./steps";

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

const whenDepositMoney = async (depositedMoney: number) => {
  const depositInput = await screen.findByRole("spinbutton", {name: "deposit"})
  const depositButton = await screen.findByRole("button", {name: "save"})
  await userEvent.type(depositInput, depositedMoney.toString())
  await userEvent.click(depositButton)
}

