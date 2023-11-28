import {useGExplorerStore} from "@/state";

export default function fetcher(key: string) {
    console.log("fetcher called")
    console.log(`fetcher url ${key}`)
    const token = useGExplorerStore.getState().token;

    const headers = token ? {
        "Authorization": `Bearer ${token}`
    } : {}


    console.warn("pre fetch")
    let res = fetch(key, {
        "headers": headers as Record<string, string>
    });
    console.warn("post fetch")

    return res.then(r => r.json());
}