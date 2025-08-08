import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = e.target.url.value;
    if (!url) {
      console.log("Please enter valid URL");
      return;
    }

    const response = await fetch('http://localhost:8000/api/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    })

    const data = await response.json();
    console.log(data)
  }

  return (
    <div>
      <h2>Youtube Video Summary Bot</h2>
      <p>Summarize any youtube video. Just provide the link.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Paste the URL: </label>
        <input type="text" name="url" id="urlInput" />
        <button type='submit'>Get Summary</button>
      </form>
    </div>
  )
}

export default App
