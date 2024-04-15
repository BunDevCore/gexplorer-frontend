import {useGExplorerStore} from "@/state";
import {BASE_API_URL} from "@/config";

export default function fetcher(key: string) {
    const token = useGExplorerStore.getState().token;
    const headers = token ? {
        "Authorization": `Bearer ${token}`
    } : {}
    let res = fetch(BASE_API_URL+key, {
        "headers": headers as Record<string, string>
    });
    return res.then((res) => {
        if (!res.ok) {
            throw res.text()
        }

        return res.json()
    } );
}