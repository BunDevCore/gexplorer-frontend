import {useGExplorerStore} from "@/state";
import {BASE_API_URL} from "@/config";

export default function fetcher(key: string) {
    console.log("fetcher called")
    console.log(`fetcher url ${key}`)
    const token = useGExplorerStore.getState().token;

    const headers = token ? {
        "Authorization": `Bearer ${token}`
    } : {}

    console.log("headers are", headers)

    console.warn("pre fetch")
    let res = fetch(BASE_API_URL+key, {
        "headers": headers as Record<string, string>
    });
    console.warn("post fetch")



    return res.then((res) => {
        if (!res.ok) {
            throw res.text()
        }

        return res.json()
    } );
}