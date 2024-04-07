import React from "react";
import {useGExplorerStore} from "@/state";
import {DefaultLayout, StandardBox} from "@/styles/universal";
import {FullUser, Trip} from "@/types/types";
import useSWR from "swr";
import fetcher from "@/fetcher";
import LoadingComponent from "@/components/LoadingComponent";
import AreaCounter from "@/components/AreaCounter";
import {DateTime} from "luxon";
import {UserPaper} from "@/styles/userpage";
import {useRouter} from "next/router";
import Button from "@mui/material/Button";
import {DistrictTable} from "@/components/DistrictTable";

export default function ProfileComponent(props: { username: string | undefined | null }) {
    const districts = useGExplorerStore(s => s.districts)
    const {data, error, isLoading} = useSWR<FullUser>(`/User/id/${props.username}`, fetcher)
    const router = useRouter()

    function goToTrip(id: string) {
        router.push(`trip/${id}`)
    }

    if (isLoading || data === undefined) return <LoadingComponent></LoadingComponent>


    return <DefaultLayout>
        <StandardBox>
            <h1>Cześć {data.username}!</h1>
            <h1>Odkrył_ś <AreaCounter area={data.overallAreaAmount}></AreaCounter></h1>
            <h2>Twoje ostatnie podróże:</h2>
            {data.trips.map(t => TripListEntry({t: t, onclick: () => goToTrip(t.id)}))}
            {/*<h3>uwaga podaje dzielnice!!!</h3>*/}
            {/*{Object.values(districts).map(d => <p>{d.name} <i>{d.area / 1000000}</i> km2</p>)}*/}

            <h2>Dzielnice</h2>
            <DistrictTable areas={data.districtAreas}></DistrictTable>
        </StandardBox>
    </DefaultLayout>;
}


//TODO: make this look bearable @LempekPL
function TripListEntry({t, onclick}: { t: Trip, onclick: any }) {
    return <UserPaper>
        {DateTime.fromISO(t.startTime).toLocaleString(DateTime.DATETIME_MED)} - {t.area} m<sup>2</sup> (+{t.newArea} m<sup>2</sup>)
        <Button variant={"contained"} onClick={onclick}>Go to trip</Button>
    </UserPaper>
}