import {useEffect, useState} from "react";
import {useGExplorerStore} from "@/state";
import {apiUrl} from "@/config";
import LargeAreaCounter from "@/components/LargeAreaCounter";

export default function ProfileComponent(props: { username: string | undefined | null }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>({});
    const t = useGExplorerStore(s => s.token)

    useEffect(() => {
        if (t !== undefined) {
            (async () => {
                let res = await fetch(apiUrl(`/User/id/${props.username}`), {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Authorization": "Bearer " + t
                    },
                });
                let json = await res.json();
                setData(json);
                setLoading(false);
            })();
        }
    }, [])

    if (loading) return <></>

    return <>
        <h1>Cześć {data.username}!</h1>
        <LargeAreaCounter m_2={data.overallAreaAmount}></LargeAreaCounter>
        <p>last trips:</p>
        {data.trips.map(t => <div>{t.id} {t.area}m<sup>2</sup></div>)}
    </>;
}