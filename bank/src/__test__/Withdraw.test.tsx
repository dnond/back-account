import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { givenAccountBalance, thenAccountBalanceIs } from "./steps";

describe('withdraw money', () => {
  it('can withdraw money', async () => {
    givenAccountBalance(30)
    await whenWithdrawMoney(20)
    await thenAccountBalanceIs(10)
  })
})

const whenWithdrawMoney = async (withdrawedMoney: number) => {
  const withdrawInput = await screen.findByRole("spinbutton", {name: "withdraw"})
  const withdrawButton = await screen.findByRole("button", {name: "withdraw"})
  await userEvent.type(withdrawInput, withdrawedMoney.toString())
  await userEvent.click(withdrawButton)
}
