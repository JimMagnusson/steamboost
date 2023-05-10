import { useState } from 'react'
import React, { useEffect } from "react"
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import steamAPIService from '../services/steamAPIService'
import steamSpyAPIService from '../services/steamSpyAPIService'
import GameList from '../components/GameList'

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

              const videos = steamGame.movies.map(item => ({
                src: item.mp4['480'],
                thumbnail: item.thumbnail,
              }))

              const suggestionObject = {
                name: steamGame.name,
                headerImage: steamGame.header_image,
                shortDescription: steamGame.short_description,
                screenshots: steamGame.screenshots.map(item => item.path_thumbnail),
                videos: videos,
                id: steamGame.steam_appid
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

    let selectedGameObject = {
      id: selectedSuggestion.id,
      image: selectedSuggestion.headerImage,
      title: selectedSuggestion.name,
      screenshots: selectedSuggestion.screenshots,
      videos: selectedSuggestion.videos,
      description: selectedSuggestion.shortDescription,
      tags: []
    }

    // API call to SteamSpy to get user defined tags
    steamSpyAPIService.getTags(selectedSuggestion.id)
    .then(tags => {
        if(tags != undefined) {
          const keys = Object.keys(tags);
          selectedGameObject.tags = keys;
          setSelectedGames(selectedGames.concat(selectedGameObject))
        }
        
        
    })
    
    // TODO: Reset search variable

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
  
  function handleOnRemoveClick(gameTitle) {
    const newSelectedGames = selectedGames.filter((item) => gameTitle !== item.title)
    setSelectedGames(newSelectedGames)
  }


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
            <GameList games = {selectedGames} onRemoveClick={handleOnRemoveClick}/>
          </div>
    </div>
  )
}
  
export default StorePageComparison