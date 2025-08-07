import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h2>Youtube Video Summary Bot</h2>
      <p>Summarize any youtube video. Just provide the link.</p>
      <form action="">
        <label htmlFor="">Paste the URL: </label>
        <input type="text" name="url" id="url" />
        <button type='submit'>Get Summary</button>
      </form>
    </div>
  )
}

export default App
