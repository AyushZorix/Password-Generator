import { useState, useCallback, useEffect , useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [pass, setPass] = useState("")

  const pwgen = useCallback(() => {
    let generatedPassword = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+{}[]|:;<>,.?/~`"

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      generatedPassword += str.charAt(char)
    }


    setPass(generatedPassword)
  }, [length, numberAllowed, charAllowed])
const pref = useRef(null)
const clipboard = useCallback(() => {
  pref.current?.select()
  window.navigator.clipboard.writeText(pass)
})
  useEffect(() => {
    pwgen()
  }, [length, numberAllowed, charAllowed, pwgen])

  return (
    <div className='w-full text-xl max-w-md mx-auto shadow-md rounded-lg px-4 py-6 my-8 text-orange-400 bg-gray-800'>
      <h1 className='text-yellow-200 text-center mb-6'>Password Generator</h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          ref={pref}
          type="text"
          value={pass}
          className='w-full px-4 py-2 text-gray-800 bg-gray-100 rounded-l-md focus:outline-none select-all'
          placeholder='Password'
          readOnly
        />
        <button
          onClick={clipboard}
          className='bg-gray-700 text-white px-4 py-2 rounded-r-md hover:bg-gray-600 transition'
        >
          Copy
        </button>
      </div>

      <div className='flex items-center gap-x-2 mb-2'>
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => setLength(e.target.value)}
        />
        <label className="text-sm text-white">Length: {length}</label>
      </div>

      <div className='flex items-center gap-x-2 mb-2'>
        <input
          type="checkbox"
          checked={numberAllowed}
          id="number"
          onChange={() => setNumberAllowed((prev) => !prev)}
        />
        <label htmlFor="number" className="text-sm text-white">Include Numbers</label>
      </div>

      <div className='flex items-center gap-x-2 mb-2'>
        <input
          type="checkbox"
          checked={charAllowed}
          id="characters"
          onChange={() => setCharAllowed((prev) => !prev)}
        />
        <label htmlFor="characters" className="text-sm text-white">Include Symbols</label>
      </div>

      <button
        onClick={pwgen}
        className='mt-4 w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition'
      >
        Generate Password
      </button> 
    </div>
  )
}

export default App
