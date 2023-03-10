import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';



dotenv.config();

const headers = {
    'Authorization': `Bearer "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"`,
  };

const configuration = new Configuration({
    apiKey: "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",
    
}); 

const openai = new OpenAIApi (configuration);

const app = express();

app.use(function(req, _res, next) {
    console.log(req.method + ' ' + req.originalUrl);
    next();
  });

app.use(function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 })


app.use(cors({origin: '*'}));

app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });
app.use(express.json());


app.get('/', async (_req, res) => {
    res.status(200).send({
        message: 'Hello from SigmaAI' ,
    })
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        res.status(200).send({
            bot: response.data.choices[0].text
            
        })
        console.log(response.data.choices[0].text);
        

    } catch (error) {
        console.error(error);
        res.status(500).send({ error })

    }
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`)
    );
