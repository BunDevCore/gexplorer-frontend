import {DefaultLayout, StandardBox} from "@/styles/universal";
import {SettingTitle, SettingLine} from "@/styles/settings";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import {MenuItem, Switch} from "@mui/material";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import useTranslation from "next-translate/useTranslation";
import {langList, themeList} from "@/types/settings";
import setLanguage from "next-translate/setLanguage";
import {setCookie, getCookie} from "cookies-next";
import type {ThemeName} from "@/types/theme";
import {toast} from "react-toastify";

const MenuProps = {
    PaperProps: {
        style: {
            width: 250,
            justifySelf: "center"
        },
    },
};

export default function Settings({theme}: { theme: { get: ThemeName, set: Dispatch<SetStateAction<ThemeName>> } }) {
    const {t} = useTranslation("settings");
    const [transport, setTransport] = useState(false);
    const [POI, setPOI] = useState(false);
    const [explored, setExplored] = useState(false);

    useEffect(() => {
        setTransport(Boolean(getCookie("MAP_TRANSPORT") ?? false));
        setPOI(Boolean(getCookie("MAP_POI") ?? false));
    }, []);

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

    const handleTransport = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setTransport(checked);
        setCookie("MAP_TRANSPORT", checked, {
            sameSite: true
        });
        toast((checked ? t("hidden") : t("shown"))+" "+t("transport"), {type: "info"});
    }

    const handlePOI = (_:  React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setPOI(checked);
        setCookie("MAP_POI", checked, {
            sameSite: true
        });
        toast((checked ? t("hidden") : t("shown"))+" "+t("places"), {type: "info"});
    }

    const handleExplored = (_:  React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setExplored(checked);
        setCookie("MAP_EXPLORED", checked, {
            sameSite: true
        });
        toast((checked ? t("hidden") : t("shown"))+" "+t("explored"), {type: "info"});
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
        <StandardBox>
            <SettingTitle>{t("mapSettings")}</SettingTitle>
            <SettingLine>
                <p>{t("mapTransport")}</p>
                <Switch onChange={handleTransport} checked={transport}/>
            </SettingLine>
            <SettingLine>
                <p>{t("mapPOI")}</p>
                <Switch onChange={handlePOI} checked={POI}/>
            </SettingLine>
            <SettingLine>
                <p>{t("mapExplored")}</p>
                <Switch onChange={handleExplored} checked={explored}/>
            </SettingLine>
        </StandardBox>
    </DefaultLayout>;
}