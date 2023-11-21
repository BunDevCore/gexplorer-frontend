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