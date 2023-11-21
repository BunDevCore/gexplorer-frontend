import dark from "./themes/dark";
import light from "./themes/light";
import {Theme, ThemeName} from "@/types/theme";

export const getTheme = (name: ThemeName): Theme => {
    switch (name) {
        case "light":
            return light;
        default:
            return dark;
    }
}