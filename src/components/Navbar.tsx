import {
    Nav, NavLink, GexplorerLink, GexplorerIcon
} from "@/styles/navbar";
import { Space } from "@/styles/universal";
import Image from "next/image";
import React from "react";
import useTranslation from "next-translate/useTranslation";

export default function Navbar() {
    const {t} = useTranslation("navbar");

    return <>
        <Nav>
            <NavLink href={"/achievements"}>{t("achievements")}</NavLink>
            <NavLink href={"/map"}>{t("map")}</NavLink>
            <GexplorerLink href={"/"}>GEXPLORER</GexplorerLink>
            <NavLink href={"/settings"}>{t("settings", null, {ns: "common"})}</NavLink>
            <NavLink href={"/account"}>{t("account")}</NavLink>
        </Nav>
        <GexplorerIcon><Image src={"/favicon.png"} alt={"gexplorer"} fill={true}/></GexplorerIcon>
        <Space space="2rem" />
    </>;
}