import {getCookie} from "cookies-next";
import {useGExplorerStore} from "@/state";

const fetcher = async (key: string) => {
    const token = useGExplorerStore(s => s.token);

    const headers = token ? {
        "Authorization": `Bearer ${token}`
    } : {}


    let res = await fetch(key, {
        "headers": headers as Record<string, string>
    });
    return await res.json();
}