import { useState, type ChangeEventHandler } from 'react'
import './App.css'
import { SearchBar } from './components/SearchBar'

    const searchHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
      console.log(e)
        e.preventDefault();
    }
function App() {
  const [count, setCount] = useState(0)

  return (
    <><h1>Hello</h1><div>
      <SearchBar
        value=''
        placeholder='search by name'
        searchHandler={searchHandler}
      ></SearchBar>
    </div></>
  )

  }

export default App
