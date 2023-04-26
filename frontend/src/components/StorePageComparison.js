import { useState } from 'react'
import React, { useEffect } from "react"
import getStorePageDetails from '../services/steamAPIService'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import steamAPIService from '../services/steamAPIService'
import GameList from '../components/GameList'
import shortDescriptions from '../services/shortDescriptions'

const steamGames = [
    {
      id: 0,
      name: "Valheim",
      appID: 892970
    },
    {
      id: 1,
      name: "Baldurs Gate 3",
      appID: 1086940
    },
    {
      id: 2,
      name: "Dota 2",
      appID: 570
    },

  ];

const steamGamesTest = [    
  {
    name: "Valheim",
    appID: 892970
  },
  {
    name: "Baldurs Gate 3",
    appID: 1086940
  },
]

const games = [
  {
    id: 1,
    image: 'game1.jpg',
    title: 'Game 1',
    tags: ['Action'],
    description: 'Description.'
  },
  {
    id: 2,
    image: 'game2.jpg',
    title: 'Game 2',
    tags: ['RPG', 'Fantasy'],
    description: 'Description'
  },
  {
    id: 3,
    image: 'game3.jpg',
    title: 'Game 3',
    tags: ['Shooter'],
    description: 'Description'
  },
  {
    id: 4,
    image: 'game4.jpg',
    title: 'Game 4',
    tags: ['Strategy'],
    description: 'Description'
  },
  {
    id: 5,
    image: 'game5.jpg',
    title: 'Game 5',
    tags: ['Strategy'],
    description: 'Description'
  }
];

const StorePageComparison = (props) => {
  const [selectedGames, setSelectedGames] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const SUGGESTIONS_LIMIT = 10;

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    
    // Ide: 
    // Result of fuzzy search set in results. 
    if(results.length > 0){
      for(let i = 0; i < results.length; i++)
        steamAPIService
        .getStorePageDetails(results[i].appid)
        .then(steamGame => {
            if(steamGame != undefined) {
              // Will show up in search bar suggestions
              const suggestionObject = {
                name: steamGame.name,
                headerImage: steamGame.header_image,
                tags: steamGame.genres.map(game => game.description),
                shortDescription: steamGame.short_description
              }

              // Update suggestions state
              setSuggestions(prevState => {
                // Add the new data to the the array
                const newSuggestions = [...prevState, suggestionObject]

                if(newSuggestions.length > SUGGESTIONS_LIMIT) {
                  return newSuggestions.slice(1); // Remove old data
                }

                return newSuggestions
              }
              )
            }
        })
    }
    
    
    // Show icon and name in the search bar by updating some state variables
  }


  const handleOnHover = (result) => {
    // the item hovered
    //console.log(result)
  }

  const handleOnSelect = (item) => {
    // Add to selected games list
    const selectedSuggestion = suggestions.find((suggestion) => suggestion.name == item.name)

    const selectedGameObject = {
      id: selectedGames.length + 1,
      image: selectedSuggestion.headerImage,
      title: selectedSuggestion.name,
      tags: selectedSuggestion.tags,
      description: selectedSuggestion.shortDescription
    }
    setSelectedGames(selectedGames.concat(selectedGameObject))
    // Reset search variable

  }

  const handleOnFocus = () => {
    //console.log('Focused')
  }

  const handleOnClear = () => {
    //console.log('Focused')

  }

  const formatResult = (item) => {
    const result = suggestions.find((suggestion) => suggestion.name == item.name)
    return (
      <div>
        <span> { result != undefined &&
          <img src={result.headerImage} alt="Trees" height="80" />
          }
          {item.name}</span>
      </div>
    )
  }

  useEffect(() => {
    steamAPIService
    .getAllApps()
    .then(games => {
      // Add index field to all elements. Errors pop up otherwise.
      games = games.map((item, index) => ({ ...item, id: index + 1 })) 
      setAllGames(games)
    })
  }, [])
  

  return (
    <div>
      <h2>Steam Store Page Comparison</h2>
        <div style={{ marginBottom: 20 }}>Search for Steam Game:</div>

          <ReactSearchAutocomplete
            items={allGames}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            styling={{ zIndex: 1 }}
            formatResult={formatResult}
            autoFocus
          />
          <div className="App">
            <GameList games = {selectedGames}/>
          </div>
    </div>
  )
}
  
export default StorePageComparison