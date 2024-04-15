import {useEffect} from "react";
import {deleteCookie} from "cookies-next";
import {useGExplorerStore} from "@/state";

export default function Logout() {
    const logout = useGExplorerStore(s => s.setLogout)

    useEffect(() => {
        deleteCookie("token")
        logout()
        window.location.replace("/");
    }, [])
}