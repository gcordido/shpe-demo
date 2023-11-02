import { ChatPane } from "./ChatPane";
import { SettingsPane } from "./SettingsPane";
import { ApiContext } from "./contexts/ApiContext";
import './styles/ChatApp.css';
import { useApiMessages } from "./customHooks/useApiMessages";
import { useSettings } from "./customHooks/useSettings";

type ChatAppProps = {
    type: 'simple' | 'full';
}

export const SimpleChatApp = (_props: Omit<ChatAppProps, 'type'>) => <ChatApp type="simple" {..._props}/>;
export const FullChatApp = (_props: Omit<ChatAppProps, 'type'>) => <ChatApp type="full" {..._props}/>;

const ChatApp = (props: ChatAppProps) => {
    const {settings, updateLanguage, toggleAudio} = useSettings();
    const {messages, onNewMessage, isWaitingForResponse} = useApiMessages();

    const isFullDemo = props.type === 'full';
    return (
        <ApiContext.Provider value={{messages, onNewMessage, isWaitingForResponse, settings, updateLanguage, toggleAudio}}>
            <section className="chatApp">
                <SettingsPane showAdvancedSettings={isFullDemo} />
                <ChatPane showAdvancedFeatures={isFullDemo}/>
            </section>
        </ApiContext.Provider>
    )
}