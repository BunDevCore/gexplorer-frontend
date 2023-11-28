import {MainLayout, CenterLayout} from "@/styles/universal";
import React, {useEffect, useState} from "react";
import {getCookie, setCookie} from "cookies-next";
import {LoginBox, LoginDataBox} from "@/styles/login";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {apiUrl} from "@/config";

export default function Login() {
    const [user, setUser] = useState("");
    const [login, setLogin] = useState(0);
    const [loginLabel, setLoginLabel] = useState("Wpisz swoją nazwę");
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
                setPassLabel("Błędny login lub hasło")
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
        setLoginLabel("Wpisz swoją nazwę")
        if (/ /g.test(user)) {
            setLoginLabel("Login nie może posiadać spacji")
            return;
        }
        if (!/\w{4,}/.test(user)) {
            setLoginLabel("Login musi być dłuższe niż 4 znaki")
            return;
        }

        setPassLabel("")
        if (/ /g.test(pass)) {
            setPassLabel("Hasło nie może posiadać spacji")
            return;
        }
        if (!/\w{8,}/.test(pass)) {
            setPassLabel("Hasło musi być dłuższe niż 7 znaków")
            return;
        }
        if (pass !== passAgain) {
            setPassLabel("Hasła muszą być takie same")
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
                setLoginLabel("Użytkownik o takim loginie już istnieje")
                return;
            }
            let data = await res.text();
            setCookie("token", data, {
                sameSite: "lax",
            });
            window.location.replace("/");
        })();
    };

    return <MainLayout><CenterLayout>
        <LoginBox>
            <Box sx={{paddingBottom: "1rem"}}>
                <Tabs value={login} onChange={changeLogin} aria-label="login tabs" centered>
                    <Tab label="Zaloguj się"/>
                    <Tab label="Zarejestruj się"/>
                </Tabs>
            </Box>
            <LoginDataBox>
                <TextField id="login-name" label="Login" variant="filled" helperText={loginLabel} required
                           error={loginLabel !== "Wpisz swoją nazwę"} onChange={(e) => setUser(e.target.value)}
                           onKeyUp={handleKeyUp}/>
                <TextField id="login-password" label="Hasło" variant="filled" helperText={passLabel} type="password"
                           required
                           error={passLabel !== ""} onChange={(e) => setPass(e.target.value)} onKeyUp={handleKeyUp}/>
                <Button sx={{display: login === 1 ? "none" : ""}} variant="contained" onClick={handleLogin}>Zaloguj
                    się</Button>
                <TextField sx={{display: login === 0 ? "none" : ""}} id="login-password-again" label="Powtórz hasło"
                           variant="filled" type="password" required
                           error={pass !== passAgain} onChange={(e) => setPassAgain(e.target.value)}
                           onKeyUp={handleKeyUp}/>
                <Button sx={{display: login === 0 ? "none" : ""}} variant="contained" onClick={handleRegister}
                >Zarejestruj się</Button>
            </LoginDataBox>
        </LoginBox>
    </CenterLayout></MainLayout>;
}
