import { useState } from 'react'
import axios from 'axios'
import React from 'react'

const baseUrl = 'http://localhost:3001/generate-short-description'

const App = () => {
  const [keywords, setKeywords] = useState('')
  const [shortDescription, setshortDescription] = useState('')


  const handleSendKeywords = (event) => {
    event.preventDefault()
    const lowerCaseKeywords = keywords.toLowerCase()
    console.log(lowerCaseKeywords)
    const keywordsObject = {
      description: lowerCaseKeywords
    }
    axios
    .post(baseUrl, keywordsObject)
    .then(response => {
      console.log('promise fulfilled')
      setshortDescription(response.data)
    })
    .catch(error => console.error(error));
  }

  const handleKeywordChange = (event) => {
    setKeywords(event.target.value)
  }

  return (
  <div>
    <p>Hello world</p>
    <form onSubmit={handleSendKeywords}>
        <input
          type="text"
          value={keywords}
          onChange={handleKeywordChange}
        />
        <button type="submit">Submit</button>
      </form>
    <p>{shortDescription}</p>
  </div>
  )
}



export default App