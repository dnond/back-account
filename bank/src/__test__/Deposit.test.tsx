import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { givenAccountBalance, thenAccountBalanceIs } from "./steps";

describe('deposit money', () => {
  it('should deposit money', async () => {
    givenAccountBalance(10)
    await whenDepositMoney(10)
    await thenAccountBalanceIs(20)
  })
})

const whenDepositMoney = async (depositedMoney: number) => {
  const depositInput = await screen.findByRole("spinbutton", {name: "deposit"})
  const depositButton = await screen.findByRole("button", {name: "save"})
  await userEvent.type(depositInput, depositedMoney.toString())
  await userEvent.click(depositButton)
}
