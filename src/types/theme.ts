import {Property} from "csstype";

export type ThemeName = "prefer" | "light" | "dark" | "other"

export type Theme = {
    type: "light" | "dark"
    background: Property.Color
    primary: Property.Color
    primaryText: Property.Color
    secondary: Property.Color
    secondaryText: Property.Color

    accent: Property.Color
    secondaryAccent: Property.Color
}