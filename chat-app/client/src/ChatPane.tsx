import { Card} from "@fluentui/react-components"
import './styles/ChatPane.css'
import { ChatPaneMessages } from "./ChatPaneMessages"
import { ChatPaneInput } from "./ChatPaneInput"

interface ChatPaneProps {
    showAdvancedFeatures: boolean;
}

export const ChatPane = ({showAdvancedFeatures}: ChatPaneProps) => {
    return (
        <Card id='chatPane'>
            <ChatPaneMessages showAdvancedFeatures={showAdvancedFeatures}/>
            <ChatPaneInput showAdvancedFeatures={showAdvancedFeatures}/>
        </Card>
    )
}