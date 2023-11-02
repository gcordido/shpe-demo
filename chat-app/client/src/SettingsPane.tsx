import { Card, CardFooter, CardHeader, Dropdown, Text, Option, Checkbox, Button, useId } from "@fluentui/react-components";
import img from './assets/SHPELogo.webp';
import './styles/SettingsPane.css';
import { useApi } from "./contexts/ApiContext";
import type { Settings } from './interfaces/Settings';
import { useThemeContext } from "./contexts/ThemeProvider";
import { WeatherMoon24Regular, WeatherSunny24Regular } from "@fluentui/react-icons";

export const SettingsPane = ({showAdvancedSettings}: { showAdvancedSettings: boolean }) => {
    return (
        <Card id="settingsPane">
            <CardHeader header={<Header/>} />
            <Settings showAdvancedSettings={showAdvancedSettings}/>
            <CardFooter><Footer/></CardFooter>
        </Card>
    )
};

const Header = () => {
    return (
        <a href={`/`} tabIndex={-1}>
            <Button className="logo-button">
                <img src={img} alt="SHPE Logo" />
            </Button>
        </a>
    )
}

const Footer = () => {
    return (
        <Text>Information accuracy may vary. Please verify the information with other sources.</Text>
    )
}

const Settings = ({showAdvancedSettings}: {showAdvancedSettings: boolean}) => {
    const {settings, updateLanguage, toggleAudio} = useApi();
    return (
        <section className="settings">
            <ul>
                { showAdvancedSettings &&
                    <>
                        <li><LanguageSetting selected={settings.language} updateLanguage={updateLanguage}/></li>
                        <li><AudioSetting selected={settings.isAudioEnabled} toggleAudio={toggleAudio}/></li>
                    </>
                }
                <li><ThemeSetting/></li>
            </ul>
        </section>
    )
}

interface LanguageSettingProps {
    selected: Settings['language'];
    updateLanguage: (language: Settings['language']) => void;
}

const LanguageSetting = ({selected, updateLanguage}: LanguageSettingProps) => {
    const options = [
        "English",
        "Spanish",
        "Portuguese"
    ];

    const onOptionSelect = (_event: unknown, data: {optionValue: string | undefined}) => {
        console.log(data);
        if (data['optionValue'] === undefined) return;
        updateLanguage(data['optionValue'] as Settings['language']);
    };

    const dropdownId = useId('language-dropdown');
    return (
        <div className="setting">
            <label id={dropdownId} hidden>Language</label>
            <Dropdown
                aria-labelledby={dropdownId}
                placeholder="Language"
                defaultValue={selected}
                onOptionSelect={onOptionSelect}
            >
                {options.map((option) => (
                <Option key={option}>
                    {option}
                </Option>
                ))}
            </Dropdown>
        </div>
    )
};

interface AudioSettingProps {
    selected: Settings['isAudioEnabled'];
    toggleAudio: () => void;
}

const AudioSetting = ({selected, toggleAudio}: AudioSettingProps) => {
    const onChange = () => {
        toggleAudio();
    
    }
    return (
        <div className="setting">
            <Checkbox labelPosition="before" label="Allow AI to use Audio" defaultChecked={selected} onChange={onChange}/>
        </div>
    )
}

const ThemeSetting = () => {
    const {theme, switchTheme} = useThemeContext();
    const onChange = () => {
        switchTheme(theme === 'Light' ? 'Dark' : 'Light');
    }
    return (
        <div className="setting">
            <Button onClick={onChange} iconPosition="after" icon={theme === 'Light' ? <WeatherSunny24Regular/> : <WeatherMoon24Regular/>}>
                Switch Theme
            </Button>
        </div>
    )
}