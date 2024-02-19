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
    ThemeSettingsButton,
    LanguageSettingsButton,
    TitleIcon
} from "@/styles/navbar_old";
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import {ChangeTheme, LocaleName} from "@/types/navbar";
import {setCookie} from "cookies-next";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import useOutside from "../../hooks/useOutside";
import setLanguage from "next-translate/setLanguage";
import {useGExplorerStore} from "@/state";

export default function NavbarOld({changeTheme}: { changeTheme: ChangeTheme }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const {t} = useTranslation("navbar")
    const loggedIn = useGExplorerStore((s) => s.loggedIn)

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
    const navbarIconRef = useRef(null);
    const settingsRef = useRef(null);
    useOutside([navbarIconRef, settingsRef], () => setDropdownOpen(false));

    const hamburgerX = 8.5;
    const hamburgerY = 13;
    const hamburgerLength = 31.5;
    const hamburgerSpacing = 10.5;
    const hamburgerStrokeWidth = 5;

    return <NavbarWrapper>
        <Nav>
            <MenuIcon onClick={toggleDropdown} ref={navbarIconRef}>
                <svg style={{
                    stroke: "black",
                    strokeLinecap: "round",
                    strokeWidth: hamburgerStrokeWidth,
                    transition: "300ms"
                }}>
                    <line x1={hamburgerX} y1={hamburgerY} x2={hamburgerX + hamburgerLength} y2={hamburgerY}
                          style={{
                              ...dropdownOpen ? {
                                  transform: `translate(-7.5px, 7.5px) rotate(45deg)`
                              } : {}, transition: "inherit", transformOrigin: "center"
                          }}/>
                    <line x1={hamburgerX} y1={hamburgerY + hamburgerSpacing}
                          x2={hamburgerX + hamburgerLength} y2={hamburgerY + hamburgerSpacing}
                          style={{opacity: Number(!dropdownOpen), transition: "inherit"}}/>
                    <line x1={hamburgerX} y1={hamburgerY + hamburgerSpacing * 2}
                          x2={hamburgerX + hamburgerLength} y2={hamburgerY + hamburgerSpacing * 2}
                          style={{
                              ...dropdownOpen ? {
                                  transform: `translate(-7.5px, -7.5px) rotate(-45deg)`
                              } : {}, transition: "inherit", transformOrigin: "center"
                          }}/>
                </svg>
            </MenuIcon>
            <MainTitle><TitleIcon><Image src={"/favicon.png"} alt={"gexplorer"} fill={true}/></TitleIcon> GExplorer</MainTitle>
            <div></div>
        </Nav>
        <Absolute $open={dropdownOpen}>
            <Dropdown $open={dropdownOpen}>
                <DropdownLink href="/"><HomeIcon/> {t("home")}</DropdownLink>
                {loggedIn ?? <DropdownLink href="/achievements"><EmojiEventsIcon/> {t("achievements")}</DropdownLink>}
                <DropdownLink href="/leaderboard"><LeaderboardIcon/> {t("leaderboard")}</DropdownLink>
                {!loggedIn ?
                    <DropdownLink href="/login"><LoginIcon/> {t("login")}</DropdownLink> :
                    <DropdownLink href="/logout"><LogoutIcon/> {t("logout")}</DropdownLink>
                }
            </Dropdown>
            <Settings $open={dropdownOpen} ref={settingsRef}>
                <SettingsTitle>{t("pageTheme")}</SettingsTitle>
                <ThemeSettingsButton changeTheme={changeTheme} ownValue={"dark"}/>
                <ThemeSettingsButton changeTheme={changeTheme} ownValue={"light"}/>
                {/*<SettingsButton changeTheme={changeTheme} ownValue={"other"} />*/}
                <SettingsTitle>{t("pageLanguage")}</SettingsTitle>
                <LanguageSettingsButton changeLocale={changeLocale} ownValue={"pl"}/>
                <LanguageSettingsButton changeLocale={changeLocale} ownValue={"en"}/>
                <LanguageSettingsButton changeLocale={changeLocale} ownValue={"de"}/>
            </Settings>
        </Absolute>
    </NavbarWrapper>;
}
