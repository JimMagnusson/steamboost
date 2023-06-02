import { useState } from 'react'
import React from "react"
import shortDescriptionService from '../services/shortDescriptions'

const ShortDescriptionGenerator = (props) => {
  const [keywords, setKeywords] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  
  const handleSendKeywords = (event) => {
    event.preventDefault()
    const lowerCaseKeywords = keywords.toLowerCase();
    const keywordsObject = {
      description: lowerCaseKeywords
    };

    shortDescriptionService
      .getNewShortDescription(keywordsObject)
      .then(response => {
        setShortDescription(response)
      })
      .catch(error => console.error(error));
  };

  const handleKeywordChange = (event) => {
    setKeywords(event.target.value)
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ marginBottom: '20px' }}>Short Description Generator</h2>
      <form onSubmit={handleSendKeywords} style={{ marginBottom: '20px' }}>
        <label htmlFor="keywords" style={{ marginBottom: '10px' }}>
          Enter what your game is about:
        </label>
        <input
          type="text"
          id="keywords"
          value={keywords}
          onChange={handleKeywordChange}
          style={{ padding: '5px' }}
        />
        <button type="submit" style={{ marginLeft: '10px', padding: '5px 10px' }}>
          Submit
        </button>
      </form>
      {shortDescription && (
        <p style={{ maxWidth: '500px', textAlign: 'center' }}>{shortDescription}</p>
      )}
    </div>
  );
};
  
export default ShortDescriptionGenerator