import { useState } from 'react'
import React from "react"
import shortDescriptionService from '../services/shortDescriptions'

const ShortDescriptionGenerator = (props) => {
  const [keywords, setKeywords] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  
  const handleSendKeywords = (event) => {
    event.preventDefault()
    const lowerCaseKeywords = keywords.toLowerCase()
    console.log(lowerCaseKeywords)
    const keywordsObject = {
      description: lowerCaseKeywords
    }

    shortDescriptionService
      .getNewShortDescription(keywordsObject)
      .then(response => {
        setShortDescription(response)
      })
      .catch(error => console.error(error));
  }

  const handleKeywordChange = (event) => {
    setKeywords(event.target.value)
  }

  return (
    <div>
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
  
export default ShortDescriptionGenerator