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
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
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
import Image from "next/image";
import {ImageWrapper} from "@/styles/universal";

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

    return <NavbarWrapper>
        <Nav>
            <MenuIcon onClick={toggleDropdown}>{dropdownOpen ? <CloseRoundedIcon/> : <MenuRoundedIcon/>}</MenuIcon>
            <MainTitle><ImageWrapper><Image src={"/favicon.png"} alt={"GExplorer Icon"} fill={true}/></ImageWrapper> GExplorer</MainTitle>
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
                <ThemeSettingsButton changeTheme={changeTheme}  ownValue={"dark"}/>
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
