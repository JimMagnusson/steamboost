const express = require('express')
const cors = require('cors')

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.post("/generate-short-description", async (request, response) => {
    const body = request.body
    const promt = "Can you give a suggestion for a short description for a Steam store page where the game is about " + body.description
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