import {MainLayout} from "@/styles/universal";
import useTranslation from "next-translate/useTranslation";
import {AboutBox, AuthorBox} from "@/styles/about";
import Image from "next/image"
export default function About() {
    const {t} = useTranslation("about")

    return <MainLayout>
        <AboutBox>
            <Image src={""} alt={t("imageAlt")}></Image>
            <AuthorBox>
                <p>Lempek</p>
                <p>{t("aboutLPK")}</p>
                <p>github<br/>mail</p>
            </AuthorBox>
        </AboutBox>
        <AboutBox>
            <Image src={""} alt={t("imageAlt")}></Image>
            <AuthorBox>
                <p>Fen</p>
                <p>{t("aboutFEN")}</p>
                <p>github<br/>mail</p>
            </AuthorBox>
        </AboutBox>
        <AboutBox>
            <Image src={""} alt={t("imageAlt")}></Image>
            <AuthorBox>
                <p>wiKapo</p>
                <p>{t("aboutWKP")}</p>
                <p>github<br/>mail</p>
            </AuthorBox>
        </AboutBox>
        <AboutBox>
            <Image src={""} alt={t("imageAlt")}></Image>
            <AuthorBox>
                <p>Szymon D</p>
                <p>{t("aboutSZD")}</p>
                <p>github<br/>mail</p>
            </AuthorBox>
        </AboutBox>
        <AboutBox style={{marginBottom: "5rem"}}>
            <Image src={""} alt={t("imageAlt")}></Image>
            <AuthorBox>
                <p>Szymon R</p>
                <p>{t("aboutSZR")}</p>
                <p>github<br/>mail</p>
            </AuthorBox>
        </AboutBox>
    </MainLayout>
}