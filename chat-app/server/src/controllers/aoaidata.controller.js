require('dotenv').config();
const axios = require('axios');
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const openaiendpoint = process.env.AZ_OPENAI_ENDPOINT;
const openaikey = process.env.AZ_OPENAI_API_KEY;
const openaimodel = process.env.MODEL;
const speechkey = process.env.SPEECH_API_KEY;
const speechregion = process.env.SPEECH_REGION;
const searchkey = process.env.SEARCH_KEY;
const searchendpoint = process.env.SEARCH_ENDPOINT;
const searchindex = process.env.SEARCH_INDEX;

async function query_companies(messages, client) {

    // const client = new OpenAIClient(openaiendpoint, new AzureKeyCredential(openaikey));
    const deploymentId = openaimodel;
    try {
        const result = await client.getChatCompletions(deploymentId, messages, 
        { maxTokens: 1024, 
          temperature: 0,
          azureExtensionOptions: {
            extensions: [
              {
                type: "AzureCognitiveSearch",
                parameters: {
                  endpoint: searchendpoint,
                  key: searchkey,
                  indexName: searchindex,
                },
              },
            ],
          },
        });
        return result;
    } catch (error) {
        console.error('Error: ', error);
        return 0;
    }
    

}

exports.openaiApiCall = async (req, res) => {

    const messages = req.body;
    const client = new OpenAIClient(openaiendpoint, new AzureKeyCredential(openaikey));
    const deploymentId = openaimodel;
    const functions = [
        {
            "name": "query_companies",
            "description": "Query Azure Cognitive Search for company data matching the user's input.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "The query string to search for company data."
                    }
                },
                "required": ["query"],
            },
        }
    ];
    const result = await client.getChatCompletions(deploymentId, messages, 
        { maxTokens: 1024, 
        temperature: 0.5,
        functions: functions,
        function_call: "auto", 
    });

    const responseMessage = result.choices[0].message;
    console.log(responseMessage);
    if(responseMessage.functionCall) {
        const functionResponse = await query_companies(messages, client);

        res.send(functionResponse)

    } else {
        res.send(result);
    }
    

}

exports.getSpeechToken = async (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    const speechKey = speechkey;
    const speechRegion = speechregion;

    if (speechKey === undefined || speechRegion === undefined) {
        res.status(400).send('You forgot to add your speech key or region to the .env file.');
    } else {
        const headers = { 
            headers: {
                'Ocp-Apim-Subscription-Key': speechKey,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        try {
            const tokenResponse = await axios.post(`https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, null, headers);
            res.send({ token: tokenResponse.data, region: speechRegion });
        } catch (err) {
            res.status(401).send('There was an error authorizing your speech key.');
        }
    }
};