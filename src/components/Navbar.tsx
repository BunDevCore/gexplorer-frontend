import {ChangeTheme} from "@/types/navbar";
import {
    Nav, NavLink, Gexplorer
} from "@/styles/navbar";

export default function Navbar() {
    return <Nav>
        <NavLink href={"/settings"}>Ustawienia</NavLink>
        <NavLink href={"/map"}>Mapa</NavLink>
        <Gexplorer>GEXPLORER</Gexplorer>
        <NavLink href={"/leaderboard"}>Leaderboard</NavLink>
        <NavLink href={"/account"}>Konto</NavLink>
    </Nav>;
}