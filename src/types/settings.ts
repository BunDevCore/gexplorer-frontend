import {ThemeName} from "./theme";

export type ChangeTheme = (themeName: ThemeName) => void;
export const themeList: ThemeName[] = ["prefer", "light", "dark", "other"]

export type LocaleName = "prefer" | "pl" | "en" | "de"
export type ChangeLocale = (lang: LocaleName) => void;
export const langList: LocaleName[] = ["prefer", "pl", "en", "de"]