import React, {useState} from "react";
import {NavbarWrapper, Nav, MenuIcon, MainTitle, Dropdown, DropdownLink, Settings, SettingsButton, Absolute, SettingsTitle} from "@/styles/navbar";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import {ChangeTheme} from "@/types/navbar";

export default function Navbar({changeTheme}: { changeTheme: ChangeTheme }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(p => !p);
    }

    return <NavbarWrapper>
        <Nav>
            <MenuIcon onClick={toggleDropdown}>{dropdownOpen ? <CloseRoundedIcon/> : <MenuRoundedIcon/>}</MenuIcon>
            <MainTitle>Gexplorer</MainTitle>
            <div></div>
        </Nav>
        <Absolute>
            <Dropdown $open={dropdownOpen}>
                <DropdownLink href="/"><HomeIcon/> Strona Główna</DropdownLink>
                <DropdownLink href="/login"><LoginIcon/> Zaloguj się</DropdownLink>
            </Dropdown>
            <Settings $open={dropdownOpen}>
                <SettingsTitle>Motyw strony</SettingsTitle>
                <SettingsButton changeTheme={changeTheme}  ownValue={"dark"} className={""}/>
                <SettingsButton changeTheme={changeTheme} ownValue={"light"} className={""}/>
                {/*<SettingsButton changeTheme={changeTheme} ownValue={"other"} />*/}
            </Settings>
        </Absolute>
    </NavbarWrapper>;
}
