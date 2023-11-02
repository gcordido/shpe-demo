const router = require('express-promise-router')();
const openaiController = require('../controllers/aoaidata.controller');
const openaiGenericController = require('../controllers/aoai.controller');

// ==> (POST): localhost: 3000/api/openai-api-call
router.post('/openai-api-call', openaiController.openaiApiCall);

// ==> (POST): localhost: 3000/api/openai-api-generic-call
router.post('/openai-api-generic-call', openaiGenericController.openaiApiGenericCall);

// ==> (GET): localhost: 3000/api/get-speech-token
router.get('/get-speech-token', openaiController.getSpeechToken);

module.exports = router;