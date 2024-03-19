import {DefaultLayout, StandardBox} from "@/styles/universal";
import useTranslation from "next-translate/useTranslation";
import {AuthorBox, ImageBox, Name, Role, ProfileGrid} from "@/styles/about";
import Image from "next/image"
export default function About() {
    const {t} = useTranslation("about")

    return <DefaultLayout>
        <StandardBox>
            <ProfileGrid>
                <ImageBox>
                    <Image src={"/blackIcon.png"} alt={t("imageAlt")} fill={true}/>
                </ImageBox>
                <div>
                    <Name>Piotr Lempkowski (Lempek)</Name>
                    <Role>Frontend</Role>
                </div>
            </ProfileGrid>
        </StandardBox>
        <StandardBox>
            <ProfileGrid>
                <ImageBox>
                    <Image src={"/s.png"} alt={t("imageAlt")} fill={true}/>
                </ImageBox>
                <Name>Stanisław Dramiński (Fen)</Name>
            </ProfileGrid>
        </StandardBox>
        <StandardBox>
            <Image src={""} alt={t("imageAlt")}></Image>
            <AuthorBox>
                <p>Wiktor Polanowski (wiKapo)</p>
                <p>{t("aboutWKP")}</p>
                <p>github<br/>mail</p>
            </AuthorBox>
        </StandardBox>
        <StandardBox>
            <Image src={""} alt={t("imageAlt")}></Image>
            <AuthorBox>
                <p>Szymon Drogosz (szdr)</p>
                <p>{t("aboutSZD")}</p>
                <p>github<br/>mail</p>
            </AuthorBox>
        </StandardBox>
        <StandardBox>
            <Image src={""} alt={t("imageAlt")}></Image>
            <AuthorBox>
                <p>Szymon Roman (Qraven)</p>
                <p>{t("aboutSZR")}</p>
                <p>github<br/>mail</p>
            </AuthorBox>
        </StandardBox>
    </DefaultLayout>
}