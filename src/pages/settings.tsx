import {DefaultLayout, StandardBox} from "@/styles/universal";
import {SettingTitle, SettingLine} from "@/styles/settings";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import {MenuItem} from "@mui/material";
import {Dispatch, SetStateAction, useState} from "react";
import useTranslation from "next-translate/useTranslation";
import {langList, themeList} from "@/types/settings";
import setLanguage from "next-translate/setLanguage";
import {setCookie, getCookie} from "cookies-next";
import type {ThemeName} from "@/types/theme";

const MenuProps = {
    PaperProps: {
        style: {
            width: 250,
            justifySelf: "center"
        },
    },
};

export default function Settings({theme}: { theme: { get: ThemeName, set: Dispatch<SetStateAction<ThemeName>> } }) {
    const {t, lang} = useTranslation("settings");

    const handleTheme = (e: SelectChangeEvent) => {
        theme.set(e.target.value as ThemeName);
        setCookie("NEXT_THEME", e.target.value, {
            sameSite: true
        });
    }

    const handleLanguage = (e: SelectChangeEvent) => {
        let newLang = e.target.value;
        if (newLang === "prefer") {
            newLang = navigator.language.split("-")[0];
        }
        (async () => {
            await setLanguage(newLang);
        })();
        setCookie("NEXT_LOCALE", e.target.value, {
            sameSite: true
        });
    }

    return <DefaultLayout>
        <StandardBox>
            <SettingTitle>{t("pageSettings")}</SettingTitle>
            <SettingLine>
                <p>{t("pageLanguage")}</p>
                <Select
                    value={(getCookie("NEXT_LOCALE") ?? "prefer") as string}
                    onChange={handleLanguage}
                    MenuProps={MenuProps}
                    sx={{width: 300}}
                >
                    {langList.map(v => <MenuItem value={v} key={v}>{t("language." + v)}</MenuItem>)}
                </Select>
            </SettingLine>
            <SettingLine>
                <p>{t("pageTheme")}</p>
                <Select
                    value={theme.get ?? "prefer"}
                    onChange={handleTheme}
                    MenuProps={MenuProps}
                    sx={{width: 300}}
                >
                    {themeList.map(v => <MenuItem value={v} key={v}>{t("theme." + v)}</MenuItem>)}
                </Select>
            </SettingLine>
        </StandardBox>
    </DefaultLayout>;
}