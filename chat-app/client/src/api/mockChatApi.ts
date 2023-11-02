import { MessageData } from "../interfaces/MessageData";

export async function callChatAPI(messages: MessageData[]): Promise<MessageData[]> {
    return new Promise<MessageData[]>((resolve) => {
        setTimeout(() => {
            resolve([...messages, {role: "assistant", content: "This is a mock response"}]);
        }, 2000);
    });
}