import React from 'react';

const SharedTags = ({ games }) => {
    // Shows what tags occur the most for the given games
   
    // Put tags from all games into single array
    const tags = games.flatMap(item => item.tags)

    // Code for counting occurances of array elements found here:
    // https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements
    const occurrences = {};
    for (const tag of tags) {
        occurrences[tag] = occurrences[tag] ? occurrences[tag] + 1 : 1;
    }

    // Convert from object to array, example: [['RPG', '4'], ['FPS', '2']]
    const occurancesArray = Object.entries(occurrences);

    // Now sort the array, look at second element
    const sortedTags = occurancesArray.sort((a, b) => b[1] - a[1])

    // Only show top 5 or so, and only show the tag name.
    const numberToShow = 5;
    const topSharedTags = sortedTags.slice(0, numberToShow).map((tag) => tag[0]);
    
    // Handle the case when a game don't have any tags:
    let gamesWithTags = 0;
    const tagsForEachGame = games.map(item => item.tags);
    for(const gameTags of tagsForEachGame) {
        if(gameTags.length > 0) {
            gamesWithTags++;
        }
    }
    // Use conditional rendering to only show the component when there are any tags included.
    return (
        <div>
        {gamesWithTags > 1 && <h3>Top {numberToShow} shared tags: </h3>}
        {gamesWithTags > 1 &&
        <ul>
            {topSharedTags.map((tag) => (
            <li key={tag}>{tag}</li>
            ))}
        </ul>
        }
        </div>
    );
};

export default SharedTags;