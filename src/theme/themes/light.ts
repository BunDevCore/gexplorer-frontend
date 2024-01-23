import type {Theme} from "@/types/theme";
import DARK from "./dark";

const light: Theme = {
    ...DARK,
    type: "light",
    navbarBackgroundColor: "#b9b9b9",
    footerBackgroundColor: "#a8a8a8",
    footerColor: "#4d4d4d",
    globalBackgroundColor: "white",
    globalTextColor: "#000",
    globalSecondaryBackgroundColor: "#c5c5c5",
    globalSecondaryTextColor: "#000",
}
export default light;