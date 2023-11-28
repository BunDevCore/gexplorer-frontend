import type {Theme} from "@/types/theme";
import DARK from "./dark";

const light: Theme = {
    ...DARK,
    type: "light",
    navbarBackgroundColor: "#a4a4a4",
    globalBackgroundColor: "white",
    globalSecondaryBackgroundColor: "#c5c5c5",

}
export default light;