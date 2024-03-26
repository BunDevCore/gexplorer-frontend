import {Property} from "csstype";

export type ThemeName = "prefer" | "light" | "dark" | "other"

export type Theme = {
    type: "light" | "dark"
    navbarBackgroundColor: Property.Color
    footerBackgroundColor: Property.Color
    footerColor: Property.Color
    globalBackgroundColor: Property.Color
    globalTextColor: Property.Color
    globalSecondaryBackgroundColor: Property.Color
    globalSecondaryTextColor: Property.Color

    // NEW COLORING
    background: Property.Color
    primary: Property.Color
    primaryText: Property.Color
    secondary: Property.Color
    secondaryText: Property.Color

    accent: Property.Color
    secondaryAccent: Property.Color
}