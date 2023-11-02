import axios from "axios";
import { MessageData } from "../interfaces/MessageData";

const MAX_MESSAGES = 30;

export async function callChatAPI(messages: MessageData[], useShpeContext: boolean = true): Promise<MessageData[]> {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === 'user') {
      try {

        let answer: string = "";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let completion: any = {};

        const url = useShpeContext ? 'http://localhost:3001/api/openai-api-call' : 'http://localhost:3001/api/openai-api-generic-call';

        const options = {
          url,
          method: 'POST',
          data: messages
        }
        
        await axios(options).then((response) => {
          completion = response;
        }).catch((error) => {
          console.error(error)
          return [];
        })
        
        if (completion != undefined || Object.keys(completion).length !== 0){
          answer = (completion.data.choices[0]?.message?.content) as string;
  
          if (messages.length > MAX_MESSAGES) {
            messages.splice(1, 1);
          }

          return [...messages, { role: 'assistant', content: answer }]
        }

      } catch (e) {
        // Handle any errors that occur during the chatbot request.
        console.error('Error getting data', e);
        throw e;
      }
    }
    throw Error("Last message sent should be from the user. CallChatApi might have been miscalled");
  }