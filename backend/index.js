import OpenAI from 'openai';
import express from "express"
import cors from 'cors';


import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

const app = express();
const port = 4949

app.use(cors());

app.use(express.json());



app.post('/', async (req, res) => {
  const { question } = req.body
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: question }],
    model: 'gpt-3.5-turbo',
  });

  res.json({
    'gpt_response': chatCompletion.choices[0].message.content
  })
})

// TODO: impletent something
app.get('/gpt',async (req,res)=>{
  res.json({
    'tes': 'tes'
  })
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
