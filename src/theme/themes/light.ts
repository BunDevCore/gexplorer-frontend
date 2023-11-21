import type {Theme} from "@/types/theme";
import DARK from "./dark";

const light: Theme = {
    ...DARK,
    type: "light",
    globalBackgroundColor: "white",

}
export default light;