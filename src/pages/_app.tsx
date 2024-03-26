import {useEffect, useState} from "react";
import {getCookie} from "cookies-next";
import {createGlobalStyle, ThemeProvider} from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "next/head";
import "../styles/globals.css";
import {getTheme} from "@/theme/theme";
import type {Theme, ThemeName} from "@/types/theme";
import type {AppProps} from "next/app";
import type { LocaleName} from "@/types/settings";
import {useGExplorerStore} from "@/state";
import mapboxgl from "mapbox-gl";
import {apiUrl} from "@/config";
import setLanguage from "next-translate/setLanguage";
import {usePathname} from "next/navigation";
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

mapboxgl.accessToken = "pk.eyJ1IjoiaW5maW5pZmVuIiwiYSI6ImNsZ21uc3d1YjA3b2QzZW1tcWQ4ZWhuZ3kifQ.ide6_yWZQVDRD546IXsfDw"


const muiTheme = (theme: Theme) => {
    return createTheme({
        palette: {
            mode: theme.type
,            primary: {
                main: theme.accent
            }
        },
    })
}

const GlobalStyles = createGlobalStyle`
    html, body {
        background: var(--background);
    }

    // load styles as css variables for ease of use
    * {
        --accent: ${(props: { theme: Theme }) => props.theme.accent};
        --secondary-accent: ${(props: { theme: Theme }) => props.theme.secondaryAccent};
        --background: ${(props: { theme: Theme }) => props.theme.background};
        --primary: ${(props: { theme: Theme }) => props.theme.primary};
        --primaryText: ${(props: { theme: Theme }) => props.theme.primaryText};
        --secondary: ${(props: { theme: Theme }) => props.theme.secondary};
        --secondaryText: ${(props: { theme: Theme }) => props.theme.secondaryText};
    }
`;

const App = ({Component, pageProps}: AppProps) => {

    const [themeName, setThemeName] = useState<ThemeName>("dark");
    useEffect(() => {
        let theme = getCookie("NEXT_THEME") as ThemeName
        setThemeName(theme)
        let locale = getCookie("NEXT_LOCALE") as LocaleName
        if (locale === "prefer") {
            locale = navigator.language.split("-")[0] as LocaleName;
        }
        (async () => {
            await setLanguage(locale);
        })()
    }, []);

    const token = useGExplorerStore((s) => s.token)
    const setToken = useGExplorerStore((s) => s.setToken)
    const setLoggedIn = useGExplorerStore((s) => s.setLoggedIn)
    const setDistricts = useGExplorerStore(s => s.setDistricts)
    // const setDistrictsLoading = useGExplorerStore(s => s.setDistrictsLoading)
    const districts = useGExplorerStore(s => s.districts)
    const [districtsLoading, setDistrictsLoading] = useState(false);

    useEffect(() => {
        if (Object.entries(districts).length === 0) {
            // useGExplorerStore.getState().districtsLoading = true;
            if (districtsLoading) return;
            fetch(apiUrl("/District"))
                .then(res => res.json()).then(json => setDistricts(json)).catch(_ => {
                console.error("kurwa jego mać zjedli dzielnice!!!");
                setDistrictsLoading(false);
            });
        }
    }, []);


    useEffect(() => {
        let t = getCookie("token");
        if (t !== undefined && t !== null) {
            setToken(t.toString())
        }
    }, [token]);

    useEffect(() => {
        let t = token
        if (t !== undefined) {
            (async () => {
                let res = await fetch(apiUrl("/Auth/check"), {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Authorization": "Bearer " + t
                    },
                });
                if (res.status == 401) {
                    console.warn("set loggedin false")
                    setLoggedIn(false)
                } else {
                    console.warn("set loggedin true")
                    setLoggedIn(true)
                }
            })();
        }
    }, [token]);

    return <ThemeProvider theme={getTheme(themeName)}>
        <MuiThemeProvider theme={muiTheme(getTheme(themeName))}>
            <GlobalStyles theme={getTheme(themeName)}/>
            <Head key="main">
                <link href="/logos/gexplorer_logo.svg" rel="icon" type="image/svg"/>
                <title>GExplorer</title>
            </Head>
            {usePathname() === "/map" || <Navbar/>}
            <Component {...pageProps} theme={{get: themeName, set: setThemeName}}/>
            {usePathname() === "/map" || <Footer/>}
        </MuiThemeProvider>
    </ThemeProvider>;
}

export default App;