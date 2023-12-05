import {DefaultLayout, StandardBox} from "@/styles/universal";
import {ItemTextList, ItemText, BoxWithImage} from "@/styles/home";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export default function HomeComponent() {
    const {t} = useTranslation("home")
    return <DefaultLayout>
        <BoxWithImage>
            <Image src={"/gdansk.webp"} alt={"gdansk"} fill={true}/>
            <StandardBox $disableBoxShadow={true}>
                {t("aboutShort")}
            </StandardBox>
        </BoxWithImage>
        <ItemTextList>
            <ItemText $color={"#0ec2ea"}>
                <div><SchoolIcon/></div>
                <p>{t("promo.0")}</p>
            </ItemText>
            <ItemText $color={"#e30dbd"} $reverse={true}>
                <div><LocationOnIcon/></div>
                <p>{t("promo.1")}</p>
            </ItemText>
            <ItemText $color={"#00ff93"}>
                <div><MonetizationOnIcon/></div>
                <p>{t("promo.2")}</p>
            </ItemText>
        </ItemTextList>
    </DefaultLayout>;
}