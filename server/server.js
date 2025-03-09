import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt

    // Create a chat completion using the prompt provided by the user.
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // Use your desired model; adjust if necessary.
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    })

    res.status(200).send({
      bot: response.data.choices[0].message.content
    })

  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))
