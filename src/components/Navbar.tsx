import {
    Nav, NavLink, GexplorerLink, GexplorerIcon
} from "@/styles/navbar";
import Image from "next/image";
import React from "react";
import useTranslation from "next-translate/useTranslation";

export default function Navbar() {
    const {t} = useTranslation("navbar");

    return <>
        <Nav>
            <NavLink href={"/"}>{t("home")}</NavLink>
            <NavLink href={"/map"}>{t("map")}</NavLink>
            <GexplorerLink href={"/"}>GEXPLORER</GexplorerLink>
            <NavLink href={"/settings"}>{t("settings", null, {ns: "common"})}</NavLink>
            <NavLink href={"/account"}>{t("account")}</NavLink>
        </Nav>
        <GexplorerIcon><Image src={"/logos/gexplorer_logo.png"} alt={"gexplorer"} fill={true}/></GexplorerIcon>
    </>;
}