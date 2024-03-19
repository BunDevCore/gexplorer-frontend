import {DefaultLayout, StandardBox} from "@/styles/universal";
import React, {useEffect, useState} from "react";
import {getCookie, setCookie} from "cookies-next";
import {LoginDataBox} from "@/styles/login";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {apiUrl} from "@/config";
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";

export default function LoginComponent() {
    const {t} = useTranslation("account");
    const [user, setUser] = useState("");
    const [login, setLogin] = useState(false);
    const [loginLabel, setLoginLabel] = useState("loginBaseLabel");
    const [passLabel, setPassLabel] = useState("passBaseLabel");
    const [pass, setPass] = useState("");
    const [passAgain, setPassAgain] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();

    useEffect(() => {
        let t = getCookie("token");
        if (t !== undefined) {
            (async () => {
                let res = await fetch(apiUrl("/Auth/check"), {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Authorization": "Bearer " + t
                    },
                });
                if (res.status === 401) {
                    return;
                } else {
                    await router.replace("/")
                    // window.location.replace("/");
                }
            })();
        }
    }, [])

    // useEffect(() => {
    //     document.title = `Gexplorer - ${login === 1 ? "Rejestracja" : "Loginizacja"}`;
    //     setPassLabel("")
    // }, [login]);

    const handleLogin = (_event: React.MouseEvent<HTMLButtonElement>) => {
        (async () => {
            let res = await fetch(apiUrl("/Auth/login"), {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "userName": user,
                    "password": pass
                })
            });
            console.log(res.status)
            if (res.status === 400) {
                setPassLabel("badEntry")
                return;
            } else {
                let data = await res.text();
                setCookie("token", data, {
                    sameSite: "lax",
                    // httpOnly:
                });
                await router.replace("/")
                //window.location.replace("/");

            }
        })();
    };

    const handleKeyUp = (event: any) => {
        if (event.key === "Enter") {
            if (login) {
                handleLogin(event)
            } else {
                handleRegister(event)
            }
        }
    }

    const handleRegister = (_event: React.MouseEvent<HTMLButtonElement>) => {
        setLoginLabel("loginBaseLabel")
        if (/\s/g.test(user)) {
            setLoginLabel("loginNotContainsSpace")
            return;
        }
        if (!/\w{4,}/.test(user)) {
            setLoginLabel("loginLongerThan4")
            return;
        }

        setPassLabel("")
        if (/\s/g.test(pass)) {
            setPassLabel("passNotContainsSpace")
            return;
        }
        if (!/\w{8,}/.test(pass)) {
            setPassLabel("passLongerThan7")
            return;
        }
        if (pass !== passAgain) {
            setPassLabel("passEqual")
            return;
        }

        (async () => {
            let res = await fetch(apiUrl("/Auth/register"), {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "userName": user,
                    "password": pass,
                    "email": email
                })
            });
            if (res.status === 422) {
                setLoginLabel("userExists")
                return;
            }
            let data = await res.text();
            setCookie("token", data, {
                sameSite: "lax",
            });
            await router.replace("/")
        })();
    };

    return <DefaultLayout>
        <StandardBox style={{margin: "0 10rem"}}>
            <Box sx={{paddingBottom: "1rem"}}>
                <Tabs value={Number(login)} onChange={(_, v) => setLogin(v)} aria-label="login tabs" centered>
                    <Tab label={t("labelLogin")}/>
                    <Tab label={t("labelRegister")}/>
                </Tabs>
            </Box>
            <LoginDataBox>
                <TextField id="login-name" label={t("login")} variant="filled"
                           helperText={t(login ? loginLabel : "").toString()}
                           required error={loginLabel !== "loginBaseLabel" && login}
                           onChange={(e) => setUser(e.target.value)}
                           onKeyUp={handleKeyUp}/>

                <TextField sx={{display: !login ? "none" : ""}} id="login-password-again"
                           label={t("labelEmail")} variant="filled" type="email" required
                           error={false}
                           onChange={(e) => setEmail(e.target.value)}
                           onKeyUp={handleKeyUp}/>

                <TextField id="login-password" label={t("password")} variant="filled"
                           helperText={t(login ? passLabel : "").toString()} type="password" required
                           error={passLabel !== "passBaseLabel" && passLabel !== ""}
                           onChange={(e) => setPass(e.target.value)}
                           onKeyUp={handleKeyUp}/>
                <Button sx={{display: login ? "none" : ""}} variant="contained" onClick={handleLogin}>
                    {t("labelLogin")}</Button>
                <TextField sx={{display: !login ? "none" : ""}} id="login-password-again"
                           label={t("labelPassAgain")} variant="filled" type="password" required
                           error={pass !== passAgain}
                           onChange={(e) => setPassAgain(e.target.value)}
                           onKeyUp={handleKeyUp}/>
                <Button sx={{display: !login ? "none" : ""}} variant="contained" onClick={handleRegister}
                >{t("labelRegister")}</Button>
            </LoginDataBox>
        </StandardBox>
    </DefaultLayout>;
}
