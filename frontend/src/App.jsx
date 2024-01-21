import { useState } from 'react'
import './App.css'
import axios from "axios"
function App() {
  async function askGpt() {
    setloading(true)
    try {
      const response = await axios.post('http://localhost:4949', {
        'question': `give me a recipe with the following ingredients ${ingredients}`
      })

      setgptResponse(response.data.gpt_response)
      setloading(false)

    } catch (error) {
      console.log(error)
      setloading(false)

    }
  }

  const [input, setinput] = useState()
  const [gptResponse, setgptResponse] = useState("")
  const [loading, setloading] = useState(false)
  const [ingredients, setingredients] = useState(['tomato', 'potato', 'onions', 'olive oil'])

  function addToList() {
    const new_list = [...ingredients, input]
    setingredients(new_list)
  }

  return (
    <>
      <div className="min-h-screen h-full flex-col font-mono  w-screen items-center flex p-5 justify-center">

       
        <div className="flex flex-col">
          <div className="flex gap-2">
            <input placeholder='enter your ingredient' className='border p-2 w-96 border-blue-600 ml-2' value={input} onChange={(event) => {
              setinput(event.target.value)
            }} />
            <button className='border p-2 bg-gray-600 text-white' onClick={addToList}>+ to list</button>
          </div>
          <div className="grid  grid-cols-2">
            {ingredients.map((i) => {
              return <div className='p-3 border m-2'>{i}</div>
            })}
          </div>
          <button className='border p-2 bg-blue-600 ml-2 text-white font-bold ' onClick={askGpt}>ASK GPT for recipe</button>
          <div>
          {loading ? <div className='p-5 w-96 border m-5 animate-pulse'>typing...</div> : <div className='p-5 w-96 border m-5'>{gptResponse}</div>}
        </div>
        </div>
      </div>
    </>
  )
}

export default App
