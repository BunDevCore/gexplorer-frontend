import React, {useState} from "react";
import {NavbarWrapper, Nav, MenuIcon, MainTitle, Dropdown, DropdownLink, Settings, SettingsButton, Absolute, SettingsTitle} from "@/styles/navbar";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import {ChangeTheme} from "@/types/navbar";
import {getCookie} from "cookies-next";

export default function Navbar({changeTheme}: { changeTheme: ChangeTheme }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(p => !p);
    }

    return <NavbarWrapper>
        <Nav>
            <MenuIcon onClick={toggleDropdown}>{dropdownOpen ? <CloseRoundedIcon/> : <MenuRoundedIcon/>}</MenuIcon>
            <MainTitle>GExplorer</MainTitle>
            <div></div>
        </Nav>
        <Absolute>
            <Dropdown $open={dropdownOpen}>
                <DropdownLink href="/"><HomeIcon/> Strona Główna</DropdownLink>
                <DropdownLink href="/achievements"><EmojiEventsIcon/> Osiągnięcia</DropdownLink>
                <DropdownLink href="/leaderboard"><LeaderboardIcon/> Leaderboard</DropdownLink>
                {getCookie("token") === null || getCookie("token") === undefined ?
                    <DropdownLink href="/login"><LoginIcon/> Zaloguj się</DropdownLink> :
                    <DropdownLink href="/logout"><LogoutIcon/> Wyloguj się</DropdownLink>
                }
            </Dropdown>
            <Settings $open={dropdownOpen}>
                <SettingsTitle>Motyw strony</SettingsTitle>
                <SettingsButton changeTheme={changeTheme}  ownValue={"dark"}/>
                <SettingsButton changeTheme={changeTheme} ownValue={"light"}/>
                {/*<SettingsButton changeTheme={changeTheme} ownValue={"other"} />*/}
            </Settings>
        </Absolute>
    </NavbarWrapper>;
}
