import {ThemeName} from "./theme";

export type ChangeTheme = (themeName: ThemeName) => void;

export type ThemeState = [ThemeName, ChangeTheme];

export const themeList: ThemeName[] = ["light", "dark", "other"]

export type LocaleName = "pl" | "en" | "de"
export const langList: LocaleName[] = ["pl", "en", "de"]