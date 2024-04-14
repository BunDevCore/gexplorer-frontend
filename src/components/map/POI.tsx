import {POIProperties} from "@/types/map";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";
import {useGExplorerStore} from "@/state";
import {
    InfoList,
    InfoSubtitle,
    InfoTitle,
    MenuTitle,
    POIdesc,
    POIimage, POIlist, POIlistItem,
    POIminiMenu,
    POIminiMenuItem, POIwebsite
} from "@/styles/map";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import {Separator} from "@/styles/universal";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";

export default function SelectedPOI({POI}: { POI: POIProperties }) {
    const router = useRouter()
    const {t} = useTranslation("poi");
    const loggedIn = useGExplorerStore(s => s.loggedIn);

    // TODO: if logged try to send request
    const save = () => {
        if (!loggedIn) {
            router.push("/account?cb=/map?select=" + POI.id)
        }
    }
    const been = () => {
        if (!loggedIn) {
            router.push("/account?cb=/map?select=" + POI.id)
        }
    }
    return <>
        <MenuTitle href={"/"}>Gexplorer</MenuTitle>
        <InfoList>
            <POIimage>
                <Image src={"/geo/images/" + POI.image} alt={POI.title} fill={true}/>
            </POIimage>
            <InfoTitle>
                {POI.title}
                <InfoSubtitle>
                    {POI.category}
                </InfoSubtitle>
            </InfoTitle>
            <POIminiMenu>
                <POIminiMenuItem onClick={save}>
                    <i><FavoriteIcon/></i> <p>{t("save", null, {ns: "map"})}</p>
                </POIminiMenuItem>
                <POIminiMenuItem onClick={been}>
                    <i><BeenhereIcon/></i> <p>{t("visited", null, {ns: "map"})}</p>
                </POIminiMenuItem>
            </POIminiMenu>
            {POI.description ? <Separator/> : <></>}
            {POI.description ? <POIdesc>{POI.description}</POIdesc> : <></>}
            <Separator/>
            <POIlist>
                {POI.address ? <POIlistItem><PlaceIcon/> <p>{POI.address}</p></POIlistItem> : <></>}
                {POI.phone ? <POIlistItem><PhoneIcon/> <p>{POI.phone}</p></POIlistItem> : <></>}
                {POI.website ? <POIlistItem><PublicIcon/> <POIwebsite
                    href={POI.website}>{POI.website}</POIwebsite></POIlistItem> : <></>}
            </POIlist>
        </InfoList>
    </>
}