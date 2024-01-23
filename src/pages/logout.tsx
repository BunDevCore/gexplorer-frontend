import {useEffect} from "react";
import {deleteCookie} from "cookies-next";

export default function Logout() {
    useEffect(() => {
        deleteCookie("token")
        window.location.replace("/");
    }, [])
}