import React from "react";
import {DefaultLayout, StandardBox} from "@/styles/universal";
import {FullUser} from "@/types/types";
import useSWR from "swr";
import fetcher from "@/fetcher";
import LoadingComponent from "@/components/LoadingComponent";
import AreaCounter from "@/components/AreaCounter";
import {DateTime} from "luxon";
import {ProfileLayout, TripListItem} from "@/styles/userpage";
import {useRouter} from "next/router";
import Button from "@mui/material/Button";
import {DistrictTable} from "@/components/DistrictTable";
import useTranslation from "next-translate/useTranslation";

export default function ProfileComponent(props: { username: string | undefined | null }) {
    const {t} = useTranslation("profile")
    const {data, isLoading} = useSWR<FullUser>(`/User/id/${props.username}`, fetcher)
    const router = useRouter()

    function goToTrip(id: string) {
        router.push(`trip/${id}`)
    }

    if (isLoading || data === undefined) return <LoadingComponent/>

    return <DefaultLayout>
        <StandardBox style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <div>
                <h1>{t("welcome")} {data.username}!</h1>
                <h1>{t("explored")} <AreaCounter area={data.overallAreaAmount}></AreaCounter></h1>
            </div>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <Button variant={"contained"} onClick={() => window.location.replace("/achievements")}>{t("achievements")}</Button>
                <Button variant={"contained"} onClick={() => window.location.replace("/upload")}>{t("import")}</Button>
            </div>
        </StandardBox>
        <ProfileLayout>
            {/*, overflowY: "scroll", maxHeight: "100vh"*/}
            <StandardBox style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                <p>{t("lastTrips")}:</p>
                {data.trips.map(det => <TripListItem key={det.id}>
                    <p>{DateTime.fromISO(det.startTime).toLocaleString(DateTime.DATETIME_MED)}</p>
                    <p>{det.area.toFixed(0)} m<sup>2</sup> (+{det.newArea.toFixed(0)} m<sup>2</sup>)</p>
                    <Button variant={"contained"} onClick={() => goToTrip(det.id)}>{t("goToTrip")}</Button>
                </TripListItem>)}
            </StandardBox>
            {/* style={{overflowY: "scroll", maxHeight: "100vh"}}*/}
            <StandardBox>
                <h2>{t("districts")}</h2>
                <DistrictTable areas={data.districtAreas}></DistrictTable>
            </StandardBox>
        </ProfileLayout>
    </DefaultLayout>;
}