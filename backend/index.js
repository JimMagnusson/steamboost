
const steamAPIService = require('./services/steamAPIService')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const app = express()

app.use(express.json())
app.use(cors())

// Schema for the database.
const gameSchema = new mongoose.Schema({
  appID: Number,
})

/*
gameSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
*/
const Game = mongoose.model('Game', gameSchema)

if (process.argv.length<3 ) {
  console.log('give password')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://jimmagnusson:${password}@cluster0.qw1m2ir.mongodb.net/gameComparisonApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.post('/set-steam-games', async (request, response) => {
  try {
    // Fetch all steam applications
    const potentialGames = await steamAPIService.getAllApps();
    
    // Add index field to all elements. Errors pop up otherwise.
    const gamesWithIds = potentialGames.map((item, index) => ({ ...item, id: index + 1 }));
    const slicedGames = gamesWithIds.slice(0, 100); // For faster testing. TODO: remove
    
    // Want to filter out all 'bad' entries in the list,
    // remove those where the success flag is false.

    const allAppIDs = slicedGames.map(item => item.appid);

    const games = [];
    // Filter out all 'bad' entries ()
    steamAPIService.getValidGameIDs(allAppIDs)
      .then((validSteamGames) => {
        // Save the valid entries on the database
        console.log(validSteamGames)
      })
      .catch((error) => {
        console.error("Error:" + error)
      })



    // database.storeGames(games);
    
    response.send(games);
  } catch (error) {
    // Handle and log any error
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/get-steam-games', (request, response) => {
  Game
  .find({})
  .then(games => {
    response.json(games)
    mongoose.connection.close()
  })
})

app.post('/add-steam-games', async (request, response) => {
  const game = new Game({
    appID: 0,
  })
  game.save().then(result => {
    console.log('game saved!')
    mongoose.connection.close()
  })
})

app.post("/generate-short-description", async (request, response) => {
    const body = request.body
    const promt = "Can you give a suggestion for a short description for a Steam store page where the game is about " + body.description + "."
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "user", content: promt}
      ]
    });
    response.send(completion.data.choices[0].message.content);
});

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)