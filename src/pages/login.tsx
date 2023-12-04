import {MainLayout} from "@/styles/universal";
import React, {useEffect, useState} from "react";
import {getCookie, setCookie} from "cookies-next";
import {LoginBox, LoginDataBox} from "@/styles/login";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {apiUrl} from "@/config";
import useTranslation from "next-translate/useTranslation";

export default function Login() {
    const {t} = useTranslation("login");
    const [user, setUser] = useState("");
    const [login, setLogin] = useState(0);
    const [loginLabel, setLoginLabel] = useState("login_base_label"); // t("login_base_label")
    const [passLabel, setPassLabel] = useState("");
    const [pass, setPass] = useState("");
    const [passAgain, setPassAgain] = useState("");

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
                    window.location.replace("/");
                }
            })();
        }
    }, [])

    useEffect(() => {
        document.title = `Geledit - ${login === 1 ? "Rejestracja" : "Loginizacja"}`;
        setPassLabel("")
    }, [login]);

    const changeLogin = (event: React.SyntheticEvent, newValue: number) => {
        setLogin(newValue);
    };

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
                setPassLabel("bad_entry")
                return;
            } else {
                let data = await res.text();
                setCookie("token", data, {
                    sameSite: "lax",
                    // httpOnly:
                });
                window.location.replace("/");
            }
        })();
    };

    const handleKeyUp = (event: any) => {
        if (event.key === "Enter") {
            if (login === 0) {
                handleLogin(event)
            } else {
                handleRegister(event)
            }
        }
    }

    const handleRegister = (_event: React.MouseEvent<HTMLButtonElement>) => {
        setLoginLabel("login_base_label")
        if (/ /g.test(user)) {
            setLoginLabel("login_not_contains_space")
            return;
        }
        if (!/\w{4,}/.test(user)) {
            setLoginLabel("login_longer_than_4")
            return;
        }

        setPassLabel("")
        if (/ /g.test(pass)) {
            setPassLabel("pass_not_contains_space")
            return;
        }
        if (!/\w{8,}/.test(pass)) {
            setPassLabel("pass_longer_than_7")
            return;
        }
        if (pass !== passAgain) {
            setPassLabel("pass_equal")
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
                    "password": pass
                })
            });
            if (res.status === 422) {
                setLoginLabel("user_exists")
                return;
            }
            let data = await res.text();
            setCookie("token", data, {
                sameSite: "lax",
            });
            window.location.replace("/");
        })();
    };

    return <MainLayout>
        <LoginBox>
            <Box sx={{paddingBottom: "1rem"}}>
                <Tabs value={login} onChange={changeLogin} aria-label="login tabs" centered>
                    <Tab label={t("label_login")}/>
                    <Tab label={t("label_register")}/>
                </Tabs>
            </Box>
            <LoginDataBox>
                <TextField id="login-name" label={t("login")} variant="filled"
                           helperText={login === 1 ? t(loginLabel).toString() : t("login_base_label").toString()}
                           required error={loginLabel !== "login_base_label" && login === 1}
                           onChange={(e) => setUser(e.target.value)}
                           onKeyUp={handleKeyUp}/>
                <TextField id="login-password" label={t("password")} variant="filled"
                           helperText={t(passLabel).toString()} type="password" required error={passLabel !== ""}
                           onChange={(e) => setPass(e.target.value)}
                           onKeyUp={handleKeyUp}/>
                <Button sx={{display: login === 1 ? "none" : ""}} variant="contained" onClick={handleLogin}>
                    {t("label_login")}</Button>
                <TextField sx={{display: login === 0 ? "none" : ""}} id="login-password-again"
                           label={t("label_pass_again")} variant="filled" type="password" required
                           error={pass !== passAgain}
                           onChange={(e) => setPassAgain(e.target.value)}
                           onKeyUp={handleKeyUp}/>
                <Button sx={{display: login === 0 ? "none" : ""}} variant="contained" onClick={handleRegister}
                >{t("label_register")}</Button>
            </LoginDataBox>
        </LoginBox>
    </MainLayout>;
}
