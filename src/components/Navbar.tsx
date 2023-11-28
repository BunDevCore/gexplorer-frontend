import React, {useRef, useState} from "react";
import {
    NavbarWrapper,
    Nav,
    MenuIcon,
    MainTitle,
    Dropdown,
    DropdownLink,
    Settings,
    Absolute,
    SettingsTitle,
    ThemeSettingsButton, LanguageSettingsButton
} from "@/styles/navbar";
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import {ChangeTheme, LocaleName} from "@/types/navbar";
import {getCookie, setCookie} from "cookies-next";
import useTranslation from "next-translate/useTranslation";
import useOutside from "../../hooks/useOutside";
import setLanguage from "next-translate/setLanguage";

export default function Navbar({changeTheme}: { changeTheme: ChangeTheme }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const {t} = useTranslation("navbar")

    const changeLocale = (localeName: LocaleName) => {
        (async () => {
            await setLanguage(localeName);
        })()
        setCookie("NEXT_LOCALE", localeName, {
            sameSite: true
        });
    }

    const toggleDropdown = () => {
        setDropdownOpen(p => !p);
    }

    // close dropdowns when clicked outside of navbar menu
    const outsideRef = useRef(null);
    useOutside(outsideRef, () => setDropdownOpen(false));

    const hamburgerX = 8.5;
    const hamburgerY = 13;
    const hamburgerLength = 31.5;
    const hamburgerSpacing = 10.5;
    const hamburgerStrokeWidth = 5;

    return <NavbarWrapper>
        <Nav>
            <MenuIcon onClick={toggleDropdown}>
                <svg style={dropdownOpen ? {
                    transition: "300ms", transformOrigin: "center",
                    transform: `translate(-7.5px, 7.5px) rotate(45deg)`
                } : {transition: "300ms"}}>
                    <line x1={hamburgerX} y1={hamburgerY} x2={hamburgerX + hamburgerLength} y2={hamburgerY}
                          style={{stroke: "black", strokeLinecap: "round", strokeWidth: hamburgerStrokeWidth}}/>
                </svg>
                <svg style={dropdownOpen ? {visibility: "hidden", opacity: 0, transition: "300ms"} :
                    {
                        visibility: "visible", opacity: 1, transition: "300ms"
                    }}>
                    <line x1={hamburgerX} y1={hamburgerY + hamburgerSpacing} x2={hamburgerX + hamburgerLength}
                          y2={hamburgerY + hamburgerSpacing}
                          style={{stroke: "black", strokeLinecap: "round", strokeWidth: hamburgerStrokeWidth}}/>
                </svg>
                <svg style={dropdownOpen ? {
                    transition: "300ms", transformOrigin: "center",
                    transform: `translate(-7.5px, -7.5px) rotate(-45deg)`
                } : {transition: "300ms"}}>
                    <line x1={hamburgerX} y1={hamburgerY + hamburgerSpacing * 2} x2={hamburgerX + hamburgerLength}
                          y2={hamburgerY + hamburgerSpacing * 2}
                          style={{stroke: "black", strokeLinecap: "round", strokeWidth: hamburgerStrokeWidth}}/>
                </svg>
            </MenuIcon>
            <MainTitle>GExplorer</MainTitle>
            <div></div>
        </Nav>
        <Absolute>
            <Dropdown $open={dropdownOpen}>
                <DropdownLink href="/"><HomeIcon/> {t("home")}</DropdownLink>
                <DropdownLink href="/achievements"><EmojiEventsIcon/> {t("achievements")}</DropdownLink>
                <DropdownLink href="/leaderboard"><LeaderboardIcon/> {t("leaderboard")}</DropdownLink>
                {getCookie("token") === null || getCookie("token") === undefined ?
                    <DropdownLink href="/login"><LoginIcon/> {t("login")}</DropdownLink> :
                    <DropdownLink href="/logout"><LogoutIcon/> {t("logout")}</DropdownLink>
                }
            </Dropdown>
            <Settings $open={dropdownOpen}>
                <SettingsTitle>Motyw strony</SettingsTitle>
                <ThemeSettingsButton changeTheme={changeTheme} ownValue={"dark"}/>
                <ThemeSettingsButton changeTheme={changeTheme} ownValue={"light"}/>
                {/*<SettingsButton changeTheme={changeTheme} ownValue={"other"} />*/}
                <SettingsTitle>Język strony</SettingsTitle>
                <LanguageSettingsButton changeLocale={changeLocale} ownValue={"pl"}/>
                <LanguageSettingsButton changeLocale={changeLocale} ownValue={"en"}/>
                <LanguageSettingsButton changeLocale={changeLocale} ownValue={"de"}/>
            </Settings>
        </Absolute>
    </NavbarWrapper>;
}
