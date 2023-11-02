import { Settings } from "../interfaces/Settings";
import { getTokenOrRefresh } from "./token_util";
import * as speechsdk from 'microsoft-cognitiveservices-speech-sdk';

const languageFeatures = {
  'Spanish' : {
    languageCode: 'es-US',
    voice: 'es-US-PalomaNeural'
  },
  'English' : {
    languageCode: 'en-US',
    voice: 'en-US-JaneNeural'
  },
  'Portuguese' : {
    languageCode: 'pt-BR',
    voice: 'pt-BR-FranciscaNeural'
  }
} as const;

export async function convertSpeechToText(updateText: (prompt: string) => void, updateIsMicActive: (isActive: boolean) => void, language: Settings['language']) {
    const tokenObj = await getTokenOrRefresh();

    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
    speechConfig.speechRecognitionLanguage = languageFeatures[language].languageCode;

    // Create an AudioConfig object that uses the default microphone input.
    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();


    const speechRecognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

    // Start recognizing speech from the microphone input.
    updateIsMicActive(true);
    speechRecognizer.recognizeOnceAsync((result: speechsdk.SpeechRecognitionResult): void => {

      // If speech was recognized, set the user's prompt to the recognized text and get a response from the OpenAI chatbot.
      if (result.reason === speechsdk.ResultReason.RecognizedSpeech) {

        const audioPrompt = result.text;
        updateText(audioPrompt);
      }

      // Stop recognition.
      updateIsMicActive(false);
      speechRecognizer.close();
    });
}
  
export async function convertTextToSpeech(message: string, language: Settings['language']) {
    const tokenObj = await getTokenOrRefresh();

    // Create a SpeechConfig object with the user's subscription key and region.
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
    
    speechConfig.speechSynthesisLanguage = languageFeatures[language].languageCode; 
    speechConfig.speechSynthesisVoiceName = languageFeatures[language].voice;

    // Create an AudioConfig object that uses the default microphone input.
    const audioConfig = speechsdk.AudioConfig.fromDefaultSpeakerOutput();

    const speechSynthesizer = new speechsdk.SpeechSynthesizer(speechConfig, audioConfig);
    speechSynthesizer.speakTextAsync(message);
  }