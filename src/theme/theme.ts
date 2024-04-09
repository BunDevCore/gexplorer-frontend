import dark from "./themes/dark";
import light from "./themes/light";
import {Theme, ThemeName} from "@/types/theme";

export const getTheme = (name: ThemeName): Theme => {
    switch (name) {
        case "light":
            return light;
        case "dark":
            return dark;
        case "prefer":
        default:
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return dark;
            }
            return light;
    }
}