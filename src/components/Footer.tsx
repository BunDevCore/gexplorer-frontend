import {Footer, FooterContent, ImageIcon, LinkList} from "@/styles/footer"
import Image from "next/image";
import Link from "next/link";

export default function FooterComponent() {
    return <Footer>
        <FooterContent>
            <ImageIcon>
                <Image src={"/blackIcon.svg"} alt="gexplorer" fill={true}/>
            </ImageIcon>
            <LinkList>
                <Link href={"/"}>Strona główna</Link>
                <Link href={"/aboutUs"}>O nas</Link>
                <Link href={"/#"}>API</Link>
                <Link href={"/#"}>Coś</Link>
            </LinkList>
        </FooterContent>
    </Footer>;
}