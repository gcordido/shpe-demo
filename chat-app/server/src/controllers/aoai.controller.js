require('dotenv').config();
const axios = require('axios');

exports.openaiApiGenericCall = async (req, res) => {

    try {
        if (process.env.AZ_OPENAI_API_KEY === undefined || process.env.AZ_OPENAI_ENDPOINT === undefined || process.env.MODEL === undefined) {
            res.status(400).send('You forgot to add your OpenAI key or endpoint to the .env file.');
        }

        const messages = req.body;  
        const params = {
            max_tokens: 1024,
            temperature: 0,
            /** Use dataSources when context is needed. Should only be considered for 2nd part of the app. */       
            messages: messages,
        };

        const response = await fetch(`${process.env.AZ_OPENAI_ENDPOINT}/openai/deployments/${process.env.MODEL}/chat/completions?api-version=2023-06-01-preview`, {
            method: 'POST',
            headers: {
                'api-key': `${process.env.AZ_OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });

        const data = await response.json();
        res.send(data);

    } catch (error) {
        console.error('Error: ', error);
        res.status(500).send({
            message: 'Error on the API Call.'
        });
    }
};

exports.getSpeechToken = async (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    const speechKey = process.env.SPEECH_API_KEY;
    const speechRegion = process.env.SPEECH_REGION;

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