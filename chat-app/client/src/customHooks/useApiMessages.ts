import React from "react";
import { defaultSysPrompt } from "../constants/api"
import { MessageData } from "../interfaces/MessageData"
import { callChatAPI } from "../api/chatApi";

export const useApiMessages = () => {
    const [messages, setMessages] = React.useState<MessageData[]>([defaultSysPrompt]);
    const [isWaitingForResponse, setIsWaitingForResponse] = React.useState(false);

    const onNewMessage = async (message: string, useShpeContext: boolean) => {
        setIsWaitingForResponse(true);
        const updatedMessageList: MessageData[] = [...messages, {role: "user", content: message}];
        setMessages(updatedMessageList);
        callChatAPI(updatedMessageList, useShpeContext).then(
            (response) => {
                setMessages(response);
                setIsWaitingForResponse(false);
            }
        ).catch((e) => {
            console.log(e);
        })
    }

    return {messages, onNewMessage, isWaitingForResponse}
}
