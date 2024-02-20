import {
    Nav, NavLink, GexplorerLink, GexplorerIcon
} from "@/styles/navbar";
import { Space } from "@/styles/universal";
import Image from "next/image";
import React from "react";

export default function Navbar() {
    return <>
        <Nav>
            <NavLink href={"/leaderboard"}>Leaderboard</NavLink>
            <NavLink href={"/map"}>Mapa</NavLink>
            <GexplorerLink href={"/"}>GEXPLORER</GexplorerLink>
            <NavLink href={"/settings"}>Ustawienia</NavLink>
            <NavLink href={"/account"}>Konto</NavLink>
        </Nav>
        <GexplorerIcon><Image src={"/favicon.png"} alt={"gexplorer"} fill={true}/></GexplorerIcon>
        <Space space="2rem" />
    </>;
}