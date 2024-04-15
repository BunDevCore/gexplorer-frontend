import {DefaultLayout, StandardBox} from "@/styles/universal";
import {BoxWithImage, HomeGrid, HomeMapBox} from "@/styles/home";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import React, {useEffect, useRef} from "react";
import mapboxgl from "mapbox-gl";

export default function HomeComponent() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const {t} = useTranslation("home")

    useEffect(() => {
        const map = new mapboxgl.Map({
            // @ts-ignore
            container: mapContainer.current,
            default: true,
            style: "mapbox://styles/mapbox/streets-v12",
            attributionControl: false,
            dragRotate: false,
            center: [18.65, 54.35],
            zoom: 11,
            trackResize: false
        });

        return () => map.remove()
    }, []);

    return <DefaultLayout>
        <BoxWithImage>
            <Image src={"/gdansk.webp"} alt={"gdansk"} fill={true} style={{paddingBottom: "4rem"}}/>
            <StandardBox $disableBoxShadow={true} style={{padding: "2rem", fontWeight: "bold", fontSize: "2rem", textAlign: "center"}}>
                {t("aboutShort")}
            </StandardBox>
        </BoxWithImage>
        <HomeGrid>
            <StandardBox style={{gridArea: "a", padding: "2rem", width: "100%", textAlign: "center", alignSelf: "center"}}>
                {t("first")}
            </StandardBox>
            <StandardBox style={{gridArea: "c", padding: "2rem", width: "100%", textAlign: "center", alignSelf: "center"}}>
                {t("second")}
            </StandardBox>
            <StandardBox style={{gridArea: "b", padding: "1rem", width: "100%", textAlign: "center", alignSelf: "center"}}>
                <p style={{padding: "0.5rem"}}>{t("third")}</p>
                <HomeMapBox ref={mapContainer}/>
            </StandardBox>
        </HomeGrid>
        {/*<ItemTextList>*/}
        {/*    <ItemText $color={"#0ec2ea"}>*/}
        {/*        <div><SchoolIcon/></div>*/}
        {/*        <p>{t("promo.0")}</p>*/}
        {/*    </ItemText>*/}
        {/*    <ItemText $color={"#e30dbd"} $reverse={true}>*/}
        {/*        <div><LocationOnIcon/></div>*/}
        {/*        <p>{t("promo.1")}</p>*/}
        {/*    </ItemText>*/}
        {/*    <ItemText $color={"#00ff93"}>*/}
        {/*        <div><VisibilityIcon/></div>*/}
        {/*        <p>{t("promo.2")}</p>*/}
        {/*    </ItemText>*/}
        {/*</ItemTextList>*/}
    </DefaultLayout>;
}