import {useEffect, useState} from "react";
import {useGExplorerStore} from "@/state";
import {apiUrl} from "@/config";
import LargeAreaCounter from "@/components/LargeAreaCounter";
import {MainLayout} from "@/styles/universal";
import {FullUser} from "@/types/types";

export default function ProfileComponent(props: { username: string | undefined | null }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<FullUser | null>(null);
    const t = useGExplorerStore(s => s.token)
    const districts = useGExplorerStore(s => s.districts)


    //TODO: refactor this i hate it its not swr !!!!!!!!
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

    if (loading || data === null) return <></>

    return <MainLayout>
        <h1>Cześć {data.username}!</h1>
        <LargeAreaCounter m_2={data.overallAreaAmount}></LargeAreaCounter>
        <p>last trips:</p>
        {data.trips.map(t => <div key={t.id}>{t.id} {t.area}m<sup>2</sup></div>)}
        <h3>uwaga podaje dzielnice!!!</h3>
        {districts.map(d => <p>{d.name} <i>{d.area / 1000000}</i> km2</p>)}
    </MainLayout>;
}