import { Button, Card, Field, Textarea } from "@fluentui/react-components"
import { Delete24Regular, Mic24Regular, MicPulse24Regular, SendRegular } from "@fluentui/react-icons"
import { useState } from "react";
import { useApi } from "./contexts/ApiContext";
import { convertSpeechToText } from "./api/audioAPI";
import './styles/ChatPaneInput.css';

interface ChatPaneInputProps {
    showAdvancedFeatures: boolean;
}

export const ChatPaneInput = ({showAdvancedFeatures}: ChatPaneInputProps) => {

    const { onNewMessage, settings } = useApi();

    const onEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            onSubmit();
            event.preventDefault();
        }
    }

    const onSubmit = () => {
        if (userPrompt === "") {
            return;
        }
        onNewMessage(userPrompt, showAdvancedFeatures);
        clearPrompt();
    }

    const clearPrompt = () => {
        setUserPrompt("");
    }

    const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserPrompt(event.target.value);
    }

    const onMicClick = () => {
        convertSpeechToText(updateUserPrompt, updateIsMicActive, settings.language);
    }

    const updateUserPrompt = (prompt: string) => {
        setUserPrompt(prompt);
    }

    const updateIsMicActive = (isActive: boolean) => {
        setIsMicActive(isActive);
    }

    const [userPrompt, setUserPrompt] = useState<string>("")
    const [isMicActive, setIsMicActive] = useState(false)

    return (
        <Card id="chatInput">
            { showAdvancedFeatures && <Button className={isMicActive ? 'blinking' : ''} content='Send' onClick={onMicClick} icon={isMicActive ? <MicPulse24Regular /> : <Mic24Regular />}/> }
            <Field>
                <Textarea
                placeholder='Type your message here'
                className="chatInput"
                value={userPrompt}
                onChange={onTextChange}
                onKeyDown={onEnter}/>
            </Field>
            <Button content='Send' onClick={onSubmit} icon={<SendRegular />}/>
            <Button content='Clear' onClick={clearPrompt} icon={<Delete24Regular />}/>
        </Card>
    )
}