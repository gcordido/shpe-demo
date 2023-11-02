import { createContext, useContext } from 'react'
import { MessageData } from '../interfaces/MessageData';
import { Settings } from '../interfaces/Settings';
import { DefaultSettings } from '../constants/settings';

interface ApiContextValue {
    messages: MessageData[],
    onNewMessage: (message: string, useShpeContext: boolean) => Promise<void>,
    isWaitingForResponse: boolean,
    settings: Settings,
    updateLanguage: (language: Settings['language']) => void,
    toggleAudio: () => void
}

const ApiContextDefaults: ApiContextValue = {
    messages: [],
    onNewMessage: () => {return new Promise(() => {})},
    isWaitingForResponse: false,
    settings: DefaultSettings,
    updateLanguage: () => {},
    toggleAudio: () => {},
}

export const ApiContext = createContext<ApiContextValue>(ApiContextDefaults)

function useApiContext() {
    const context = useContext(ApiContext);
    
    if (!context) {
        throw new Error(`ApiContext.Provider missing in React tree`);
    }

    return context;
}

export function useApi(): ApiContextValue {
    return useApiContext();
}