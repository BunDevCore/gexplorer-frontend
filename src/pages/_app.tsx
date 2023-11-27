import {useEffect, useState} from "react";
import {getCookie, setCookie} from "cookies-next";
import {createGlobalStyle, ThemeProvider} from "styled-components";
import Navbar from "../components/Navbar";
import Head from "next/head";
import "../styles/globals.css";
import {getTheme} from "@/theme/theme";
import type {Theme, ThemeName} from "@/types/theme";
import type {AppProps} from "next/app";
import {ChangeTheme} from "@/types/navbar";
import {useGExplorerStore} from "@/state";
import mapboxgl from "mapbox-gl";
import {apiUrl} from "@/config";

mapboxgl.accessToken = "pk.eyJ1IjoiaW5maW5pZmVuIiwiYSI6ImNsZ21uc3d1YjA3b2QzZW1tcWQ4ZWhuZ3kifQ.ide6_yWZQVDRD546IXsfDw"


const GlobalStyles = createGlobalStyle`
  html, body {
    background: var(--global-background-color);
  }

  // load styles as css variables for ease of use
  * {
    --navbar-background-color: ${(props: { theme: Theme }) => props.theme.navbarBackgroundColor};
    --global-background-color: ${(props: { theme: Theme }) => props.theme.globalBackgroundColor};
    --global-secondary-background-color: ${(props: { theme: Theme }) => props.theme.globalSecondaryBackgroundColor};
    --accent: ${(props: { theme: Theme }) => props.theme.accent};
    --secondary-accent: ${(props: { theme: Theme }) => props.theme.secondaryAccent};
  }
`;

const App = ({Component, pageProps}: AppProps) => {
  const [themeName, setThemeName] = useState<ThemeName>("dark");
  useEffect(() => {
    let theme = getCookie("NEXT_THEME") as ThemeName
    setThemeName(theme)
  }, []);

  const changeTheme = (themeName: ThemeName) => {
    setThemeName(themeName);
    setCookie("NEXT_THEME", themeName, {
      sameSite: true
    });
  }

  const token = useGExplorerStore((s) => s.token)
  const setToken = useGExplorerStore((s) => s.setToken)
  const setLoggedIn = useGExplorerStore((s) => s.setLoggedIn)
  const setDistricts = useGExplorerStore(s => s.setDistricts)

  fetch(apiUrl("/District"))
      .then(res => res.json()).then(json => setDistricts(json)).catch(_ => console.error("kurwa jego mać zjedli dzielnice!!!"));




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
        let res = await fetch("http://localhost:5107/Auth/check", {
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
  }, [token])


  return <ThemeProvider theme={getTheme(themeName)}>
    <GlobalStyles theme={getTheme(themeName)}/>
    <Head>
      <link href="/First_mock_gexplorer.png" rel="icon" type="image/png"/>
      <title>GExplorer</title>
    </Head>
    <Navbar changeTheme={changeTheme as ChangeTheme}/>
    <Component {...pageProps} />
  </ThemeProvider>;
}

export default App;