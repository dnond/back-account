import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { thenAccountBalanceIs, thenBalanceHistoryIs, givenAccountBalanceAndHistories } from "./steps";

describe('withdraw money', () => {
  it('can withdraw money', async () => {
    givenAccountBalanceAndHistories(30, [{
      date: new Date('2022/12/13'),
      transaction: 30,
      currentBalance: 30,
    }])
    await whenWithdrawMoney(20)
    await thenAccountBalanceIs(10)

    thenBalanceHistoryIs([{
      date: new Date('2022/12/13'),
      transaction: 30,
      currentBalance: 30,
    },
    {
      date: new Date('2022/12/14'),
      transaction: -20,
      currentBalance: 10,
    }])
  })

  it('can not withdraw money', async () => {
    givenAccountBalanceAndHistories(10, [{
      date: new Date('2022/12/13'),
      transaction: 10,
      currentBalance: 10,
    }])
    await whenWantWithdrawMoney(20)
    await thenWithDrawIsImpossible()
  })
})

const thenWithDrawIsImpossible = async () => {
  const withdrawButton = await screen.findByRole("button", {name: "withdraw"})
  expect(withdrawButton).toBeDisabled()
}

const whenWantWithdrawMoney = async (wantedWithdrawMoney: number) => {
  const withdrawInput = await screen.findByRole("spinbutton", {name: "withdraw"})
  await userEvent.type(withdrawInput, wantedWithdrawMoney.toString())
}

const whenWithdrawMoney = async (withdrawedMoney: number) => {
  const withdrawInput = await screen.findByRole("spinbutton", {name: "withdraw"})
  const withdrawButton = await screen.findByRole("button", {name: "withdraw"})
  await userEvent.type(withdrawInput, withdrawedMoney.toString())
  await userEvent.click(withdrawButton)
}
