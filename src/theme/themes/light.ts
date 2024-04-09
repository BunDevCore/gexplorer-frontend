import type {Theme} from "@/types/theme";
import DARK from "./dark";

const light: Theme = {
    ...DARK,
    type: "light",
    background: "#ffffff",
    primary: "#c5c5c5",
    primaryText: "#000000",
    secondary: "#a8a8a8",
    secondaryText: "#000000",
}
export default light;