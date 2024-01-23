import {ThemeName} from "./theme";

export type ChangeTheme = (themeName: ThemeName) => void;
export const themeList: ThemeName[] = ["light", "dark", "other"]

export type LocaleName = "pl" | "en" | "de"
export type ChangeLocale = (lang: LocaleName) => void;
export const langList: LocaleName[] = ["pl", "en", "de"]