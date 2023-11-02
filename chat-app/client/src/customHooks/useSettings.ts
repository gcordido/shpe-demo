import { useState } from "react"
import { Settings } from "../interfaces/Settings"
import { DefaultSettings } from "../constants/settings"

export const useSettings = () => {
    const [settings, setSettings] = useState<Settings>(DefaultSettings);

    const updateLanguage = (language: Settings['language']) => {
        setSettings(settings => { return {...settings, language} });
    }

    const toggleAudio = () => {
        setSettings(settings => { return {...settings, isAudioEnabled: !settings.isAudioEnabled}});
    }

    return {settings, updateLanguage, toggleAudio}
}