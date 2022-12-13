import { FC, useState, useCallback, FormEvent, useEffect } from "react"
import { Provider, useDispatch, useSelector } from "react-redux"
import { Repository } from "./core/repository"
import { createPresenter } from "./core/presenter"
import { createStore, Dispatch, AccountStore } from "./store/store"
import { depositMoney, withdrawMoney } from "./store/action"
import { selectBalance } from "./store/selector"

export const App: FC<{repository: Repository}> = ({repository}) => {
  const presenter = createPresenter()
  const [store, setStore] = useState<AccountStore>()

  useEffect(() => {
    createStore(repository, presenter).then((newStore) => { setStore(newStore)})
  }, [])

  return store
    ? <Provider store={store}>
        <Balance />
        <Deposit />
        <Withdraw />
      </Provider>
    : <></>
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

export const Withdraw: FC = () => {
  const [withdrawed, setWithdraw] = useState("")
  const dispatch = useDispatch<Dispatch>()

  const onInput = useCallback((event: FormEvent<HTMLInputElement> & { target: {value: string} }) => {
    setWithdraw(event.target.value)
  }, [setWithdraw])

  const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(withdrawMoney(Number(withdrawed)))
  }, [withdrawed, dispatch])

  return <form onSubmit={onSubmit}>
    <label>withdraw <input type="number" onInput={onInput} value={withdrawed} /></label>
    <button type="submit">withdraw</button>
  </form>
}

export const Balance: FC = () => {
  const balance = useSelector(selectBalance)
  return <p role="status">{balance}</p>
}