import {ThemeName} from "./theme";

export type ChangeTheme = (themeName: ThemeName) => void;

export type ThemeState = [ThemeName, ChangeTheme];

export const themeList: ThemeName[] = ["light", "dark", "other"]

export const PolishThemes: Record<ThemeName, string> = {
    "light": "Jasny",
    "dark": "Ciemny",
    "other": "Inny"
}