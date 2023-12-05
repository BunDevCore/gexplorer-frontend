import type {Theme} from "@/types/theme";
import DARK from "./dark";

const light: Theme = {
    ...DARK,
    type: "light",
    navbarBackgroundColor: "#b9b9b9",
    footerBackgroundColor: "#a8a8a8",
    globalBackgroundColor: "white",
    globalSecondaryBackgroundColor: "#c5c5c5",

}
export default light;