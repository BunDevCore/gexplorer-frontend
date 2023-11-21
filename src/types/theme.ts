import {Property} from "csstype";

export type ThemeName = "light" | "dark" | "other"

export type Theme = {
    type: "light" | "dark"
    navbarBackgroundColor: Property.Color
    globalBackgroundColor: Property.Color
    globalSecondaryBackgroundColor: Property.Color
    accent: Property.Color
    secondaryAccent: Property.Color
}