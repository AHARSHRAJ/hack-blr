import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import googleTrends from 'google-trends-api'

const app = express();
const port = 5000;
app.use(bodyParser.json());
app.use(cors());

const ORG_ID = 'org-CFhcMpXMCyws0r0fhqG5lbo4'
const API_TOKEN = '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'


const configuration = new Configuration({
    organization: ORG_ID,
    apiKey: API_TOKEN,
});
const openai = new OpenAIApi(configuration);
app.get("/", (req, res) => {

})

app.post("/completions", async (request, response) => {
    const { message } = request.body;
    var data;

    const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a EbereGPT. You can help with graphic design tasks",
            }, {
                role: 'user'
                , content: message
            },
        ],
    });




    googleTrends.interestOverTime({ keyword: 'Women\'s march' })
        .then(function (results) {
            response.send({
                output: result.data.choices[0].message
            });
        })
        .catch(function (err) {
            console.error('Oh no there was an error', err);
        });


});

app.listen(port, '0.0.0.0', () => {
    console.log(`listening on port ${port}`);
});
