import { BrandVariants, FluentProvider, createDarkTheme, createLightTheme } from "@fluentui/react-components";
import { PropsWithChildren, createContext, useContext, useState } from "react";

// SHPE Brand Color Guidelines
// https://shpe.org/wp-content/uploads/2022/08/SHPE2020_LogoUsageGuide_v6.pdf
const ShpeTheme: BrandVariants = {
    10: '#fd652f',
    20: '#0a0402',
    30: '#281008',
    40: '#4c1f0e',
    50: '#973d1d',
    60: '#de5a2a',
    70: '#fd7644',
    80: '#fd8b61',
    90: '#fea98b',
    100: '#345495',
    110: '#092969',
    120: '#113273',
    130: '#16387a',
    140: '#1b3d7f',
    150: '#345495',
    160: '#c8c8c8',
}

type Themes = 'Light' | 'Dark';

interface ThemeContextProps {
    theme: Themes;
    switchTheme: (theme: Themes) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: 'Light',
    switchTheme: () => {}
});

export function useThemeContext() {
    return useContext(ThemeContext);
}

const useTheme = () => {
    const [theme, setTheme] = useState<Themes>('Light');

    const switchTheme = (theme: Themes) => {
        setTheme(theme);
    }

    return {theme, switchTheme};
}

export const ThemeProvider = ({ children }: PropsWithChildren<object>): JSX.Element => {
    const {theme, switchTheme} = useTheme();

    const fluentTheme = theme === 'Light' ? createLightTheme(ShpeTheme) : createDarkTheme(ShpeTheme);

    const value = {theme, switchTheme};

    return (
      <ThemeContext.Provider value={value}>
        <FluentProvider theme={fluentTheme}>
            {children}
        </FluentProvider>
      </ThemeContext.Provider>
    );
};