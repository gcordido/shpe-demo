import { Avatar, Card, CardFooter, Text } from "@fluentui/react-components";
import { MessageData } from "./interfaces/MessageData"
import Markdown from "react-markdown";
import img from './assets/SHPELogo.webp';
import { displayMessageWhenEmptyFullDemo, displayMessageWhenEmptySimpleDemo } from "./constants/defaultMessages";
import './styles/ChatPaneMessages.css';
import { useApi } from "./contexts/ApiContext";
import { useEffect, useRef } from "react";
import { convertTextToSpeech } from "./api/audioAPI";

interface ChatPaneMessagesProps {
    showAdvancedFeatures: boolean;
}

export const ChatPaneMessages = ({showAdvancedFeatures}: ChatPaneMessagesProps) => {
    const { messages, isWaitingForResponse, settings } = useApi();
    const messagesEndRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        if (showAdvancedFeatures && settings.isAudioEnabled && messages && messages[messages.length-1].role === "assistant") {
            convertTextToSpeech(messages[messages.length-1].content, settings.language);
        }
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current?.scrollHeight;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

    return (
        <Card id="messages" ref={messagesEndRef}>
            {messages.length > 1 ? (
                messages.map((message, index) => {
                    if (message.role === "system") {
                        return null;
                    }
                    return message.role === "user" ? (
                        <UserMessage key={index} message={message} />
                    ) : (
                        <AIMessage key={index} message={message} />
                    );
                })
                ) : (
                    <>
                        <AIMessage message={showAdvancedFeatures ? displayMessageWhenEmptyFullDemo : displayMessageWhenEmptySimpleDemo} />
                    </>
                )
            }
            <CardFooter>{isWaitingForResponse && <WaitingForResponse/>}</CardFooter>
        </Card>
    )

}

interface MessageProps {
    message: MessageData;
}

const UserMessage = ({ message }: MessageProps) => {
    return (
        <section className="user-message">
            <Text className="user-content">
                {message.content}
            </Text>
        </section>
    );
};

const AIMessage = ({ message }: MessageProps) => {
    return (
        <section className="ai-message">
            <Avatar
                name="SHPE AI"
                image={{src: img}}
                color="platinum"
            />
            <Text className="ai-content">
                <Markdown>{message.content}</Markdown>
            </Text>
        </section>
    );
};

const WaitingForResponse = () => {
    return (
        <section className="ai-message">
            <Text>
                SHPE AI is thinking
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
            </Text>
        </section>
    );
}