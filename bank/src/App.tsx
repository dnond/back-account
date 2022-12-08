import { FC, useState, useCallback, FormEvent } from "react"
import { Provider, useDispatch, useSelector } from "react-redux"
import { Repository } from "./core/repository"
import { createPresenter } from "./core/presenter"
import { createStore, Dispatch } from "./store/store"
import { depositMoney } from "./store/action"
import { selectBalance } from "./store/selector"

export const App: FC<{repository: Repository}> = ({repository}) => {
  const presenter = createPresenter()
  const store = createStore(repository, presenter)

  return <Provider store={store}>
    <Balance />
    <Deposit />
    </Provider>
}

export const Deposit: FC = () => {
  const [deposited, setDeposit] = useState("")
  const dispatch = useDispatch<Dispatch>()

  const onInput = useCallback((event: FormEvent<HTMLInputElement> & { target: {value: string} }) => {
    setDeposit(event.target.value)
  }, [setDeposit])

  const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(depositMoney(Number(deposited)))
  }, [deposited, dispatch])

  return <form onSubmit={onSubmit}>
    <label>deposit <input type="number" onInput={onInput} value={deposited} /></label>
    <button type="submit">save</button>
  </form>
}

export const Balance: FC = () => {
  const balance = useSelector(selectBalance)
  return <p role="status">{balance}</p>
}