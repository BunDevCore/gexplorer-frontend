import useSWR from "swr";
import {apiUrl} from "@/config";
import {useRouter} from "next/router";
import {useGExplorerStore} from "@/state";
import {useEffect, useState} from "react";
import fetcher from "@/fetcher";

export default function TripPage() {
    const router = useRouter()
    const [id, setId] = useState<string | null>(null);

    const loggedIn = useGExplorerStore(s => s.loggedIn);
    const triedAuthenticating = useGExplorerStore(s => s.initialAuthDone);
    useEffect(() => {
        console.warn("li")
        console.warn(loggedIn)
        if (!triedAuthenticating) return;
        if (!loggedIn) router.push("/login")
    }, [loggedIn, triedAuthenticating])

    useEffect(() => {
        const id = router.query.id;
        console.warn("id")
        console.warn(id)
        setId(id as string)
    }, [router]);


    console.log("swr")
    console.log(id)
    const {data, error, isLoading} = useSWR(apiUrl(`/Trip/id/${id}`), fetcher);

    if (isLoading || !data) return <p>loading...</p>

    return <h1>{data.area}</h1>;
}