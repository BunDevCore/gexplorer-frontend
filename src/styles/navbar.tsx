import styled, {useTheme} from "styled-components";
import Link from "next/link";
import type {Theme, ThemeName} from "@/types/theme";
import React from "react";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {ChangeTheme, ChangeLocale, LocaleName} from "@/types/navbar";
import useTranslation from "next-translate/useTranslation";

export const NavbarWrapper = styled.div`
  position: relative;
  z-index: 621;
`;

export const Nav = styled.nav`
  --nav-padding: 1rem;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--navbar-height) + var(--nav-padding);
  background-color: var(--global-background-color);
  color: black;
  padding: var(--nav-padding);
`;

export const MenuIcon = styled.div`
  cursor: pointer;
  user-select: none;
  width: var(--navbar-height);
  height: var(--navbar-height);
  position: relative;
  background-color: var(--navbar-background-color);
  border-radius: 1rem;
  
  &:active {
    scale: 0.9;
  }
  
  svg {
    position: absolute;
    overflow: hidden;
    display: block;
    height: 100%;
    width: 100%;
  }
`;

export const MainTitle = styled.div`
  color: ${props => props.theme.type === "dark" ? "var(--secondary-accent)" : "var(--accent)"};
  font-size: 2.5rem;
  font-weight: bold;
  display: flex;
  gap: .5rem;
`;

export const TitleIcon = styled.div`
  width: var(--navbar-height);
  height: var(--navbar-height);
  position: relative;
  
  img {
    object-fit: cover;
  }
`;

export const Absolute = styled.div<{$open: boolean}>`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 450px) {
    width: 100%;
  }
  
  ${props => props.$open ? "transform: translateX(0); transition-delay: 0;" : "transform: translateX(-100%); transition-delay: 500ms;"}
`;

export const Dropdown = styled.div<{$open: boolean}>`
  background-color: var(--navbar-background-color);
  display: flex;
  flex-direction: column;
  transition: 300ms;
  border-radius: 0 1rem 1rem 0;
  overflow: hidden;

  @media (max-width: 450px) {
    border-radius: 0;
  }

  ${props => props.$open ? "transform: translateX(0); filter: opacity(1);" : "transform: translateX(-100%); filter: opacity(0);"}
`;

export const DropdownLink = styled(Link)`
  cursor: pointer;
  background-color: var(--navbar-background-color);
  display: flex;
  flex-direction: row;
  align-items: center;
  color: black;
  text-decoration: none;
  padding: 1rem 1.5rem 1rem 1rem;
  font-size: 1.5rem;
  gap: 1rem;
  user-select: none;

  svg {
    font-size: 2rem;
  }

  &:hover {
    filter: brightness(0.75);
  }

  @media (max-width: 450px) {
    padding: 1.5rem 2rem 1.5rem 1.5rem;
    font-size: 1.75rem;

    svg {
      font-size: 2.5rem;
    }

    &:hover {
      filter: brightness(1);
    }
  }
`;

export const Settings = styled.div<{ $open: boolean }>`
  background-color: var(--navbar-background-color);
  display: flex;
  flex-direction: column;
  transition: 300ms;
  border-radius: 0 1rem 1rem 0;
  overflow: hidden;
  transition-delay: 100ms;

  @media (max-width: 450px) {
    border-radius: 0;
  }

  ${props => props.$open ? "transform: translateX(0); filter: opacity(1);" : "transform: translateX(-100%); filter: opacity(0);"}

`;

function ThemeSettingsButtonComponent({className, changeTheme, ownValue}: { className?: string, changeTheme: ChangeTheme,  ownValue: ThemeName}) {
    let theme = useTheme() as Theme;
    let {t} = useTranslation("navbar");
    return theme.type == ownValue ? <button className={className}>
          <RadioButtonCheckedIcon/> <span>{t(`theme.${ownValue}`)}</span>
      </button> : <button className={className} onClick={() => changeTheme(ownValue)}>
          <RadioButtonUncheckedIcon/> <span>{t(`theme.${ownValue}`)}</span>
      </button>;
}

function LanguageSettingsButtonComponent({className, changeLocale, ownValue}: { className?: string, changeLocale: ChangeLocale, ownValue: LocaleName}) {
    const {t, lang} = useTranslation("navbar");
    return lang == ownValue ? <button className={className}>
        <RadioButtonCheckedIcon/> <span>{t(`language.${ownValue}`)}</span>
    </button> : <button className={className} onClick={() => changeLocale(ownValue)}>
        <RadioButtonUncheckedIcon/> <span>{t(`language.${ownValue}`)}</span>
    </button>;
}

export const SettingsButton = (v: any) => styled(v)`
  cursor: pointer;
  background-color: var(--navbar-background-color);
  display: flex;
  flex-direction: row;
  align-items: center;
  color: black;
  text-decoration: none;
  padding: 1rem 1.5rem 1rem 1rem;
  font-size: 1.5rem;
  gap: 1rem;
  border: none;
  transition: 200ms;
  user-select: none;
  
  svg {
    font-size: 2rem;
  }

  &:hover {
    filter: brightness(0.75);
  }

  @media (max-width: 450px) {
    padding: 1.5rem 2rem 1.5rem 1.5rem;
    font-size: 1.75rem;

    &:hover {
      filter: brightness(1);
    }
  }
`;

export const ThemeSettingsButton = SettingsButton(ThemeSettingsButtonComponent);
export const LanguageSettingsButton = SettingsButton(LanguageSettingsButtonComponent);

export const SettingsTitle = styled.p`
  background-color: var(--navbar-background-color);
  display: flex;
  flex-direction: row;
  align-items: center;
  color: black;
  font-weight: bold;
  padding: 1rem 1.5rem 1rem 1rem;
  font-size: 1.5rem;
  border: none;
  user-select: none;
`;