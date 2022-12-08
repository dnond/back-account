import { FC, useState } from "react"
import { Provider } from "react-redux"
import { Repository } from "./core/repository"
import { createPresenter } from "./core/presenter"
import { createStore } from "./store/store"

export const App: FC<{repository: Repository}> = ({repository}) => {
  const presenter = createPresenter()
  const store = createStore(repository, presenter)

  return <Provider store={store}>
    <Balance />
    <Deposit />
    </Provider>
}

export const Deposit: FC = () => {
  const [] = useState()

  return <form>
    <label>deposit <input type="number"/></label>
    <button>save</button>
  </form>
}

export const Balance: FC = () => {
  return <p role="status"></p>
}