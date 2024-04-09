import {DefaultLayout, Space, StandardBox} from "@/styles/universal";
import useTranslation from "next-translate/useTranslation";
import {ImageBox, Name, Role, ProfileGrid, LinkList} from "@/styles/about";
import Image from "next/image"
export default function About() {
    const {t} = useTranslation("about")

    return <DefaultLayout>
        <StandardBox>
            <ProfileGrid>
                <ImageBox>
                    <Image src={"/about/lempek.webp"} alt={t("imageAlt")} fill={true}/>
                </ImageBox>
                <div>
                    <Name>Piotr Lempkowski (Lempek)</Name>
                    <Role>Frontend</Role>
                    <LinkList>
                        <a href="https://github.com/lempekpl" target="_blank">Github</a>
                        <a href="https://twitter.com/lempekpl" target="_blank">X/Twitter</a>
                    </LinkList>
                </div>
            </ProfileGrid>
        </StandardBox>
        <StandardBox>
            <ProfileGrid>
                <ImageBox>
                    <Image src={"/blackIcon.png"} alt={t("imageAlt")} fill={true}/>
                </ImageBox>
                <div>
                    <Name>Stanisław Dramiński (Fen)</Name>
                    <Role>Backend</Role>
                    <LinkList>
                        <a href="https://github.com/infinifen" target="_blank">Github</a>
                    </LinkList>
                </div>
            </ProfileGrid>
        </StandardBox>
        <StandardBox>
            <ProfileGrid>
                <ImageBox>
                    <Image src={"/about/wikapo.webp"} alt={t("imageAlt")} fill={true}/>
                </ImageBox>
                <div>
                    <Name>Wiktor Polanowski (wiKapo)</Name>
                    <Role>Mobile</Role>
                    <LinkList>
                        <a href="https://github.com/wikapo" target="_blank">Github</a>
                    </LinkList>
                </div>
            </ProfileGrid>
        </StandardBox>
        <StandardBox>
            <ProfileGrid>
                <ImageBox>
                    <Image src={"/blackIcon.png"} alt={t("imageAlt")} fill={true}/>
                </ImageBox>
                <div>
                    <Name>Szymon Drogosz</Name>
                    <Role>Dokumentacja i transkrypcja</Role>
                    <LinkList>
                        <a href="https://github.com/szdr" target="_blank">Github</a>
                    </LinkList>
                </div>
            </ProfileGrid>
        </StandardBox>
        <StandardBox>
            <ProfileGrid>
                <ImageBox>
                    <Image src={"/blackIcon.png"} alt={t("imageAlt")} fill={true}/>
                </ImageBox>
                <div>
                    <Name>Szymon Roman (Qraven)</Name>
                    <Role>Rzeczy 👍</Role>
                    <LinkList>
                        <a href="https://github.com/qraven" target="_blank">Github</a>
                    </LinkList>
                </div>
            </ProfileGrid>
        </StandardBox>
        <Space space=".5rem"/>
    </DefaultLayout>
}