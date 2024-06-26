import {Footer, FooterContent, ImageIcon, LinkList} from "@/styles/footer"
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

export default function FooterComponent() {
    const {t} = useTranslation("common")

    return <Footer>
        <FooterContent>
            <ImageIcon>
                <Image src={"/logos/gexplorer_gray.svg"} alt="gexplorer" fill={true}/>
            </ImageIcon>
            <LinkList>
                <Link href={"/"}>{t("mainPage")}</Link>
                <Link href={"/about"}>{t("aboutUs")}</Link>
                <Link href={"/settings"}>{t("settings")}</Link>
            </LinkList>
        </FooterContent>
    </Footer>;
}