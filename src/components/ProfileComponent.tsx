import {useEffect, useState} from "react";
import {getCookie} from "cookies-next";
import {useGExplorerStore} from "@/state";
import {apiUrl} from "@/config";

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

    return <h1>{data.overallAreaAmount} m<sup>2</sup></h1>;
}