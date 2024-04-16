// import AchievementBox from "@/components/AchievementBox";
import {DefaultLayout, StandardBox} from "@/styles/universal"
import {AchiInsideContent} from "@/styles/achievementBox";
import useSWR from "swr";
import fetcher from "@/fetcher";
import {useGExplorerStore} from "@/state";
import useTranslation from "next-translate/useTranslation";
import {DateTime} from "luxon";
import Button from "@mui/material/Button";
import React from "react";
import {useRouter} from "next/router";

type User = {
    id: string
    username: string
    overallAreaAmount: number
    joinedAt: string
    trips: any[]
    tripAmount: number
    totalTripLength: number
    districtAreas: any[]
    achievements: any[]
}

export default function Achievements() {
    const {t} = useTranslation("achievements");
    const com = useTranslation("common");

    const id = useGExplorerStore(s => s.id)
    const userSWR = useSWR<User>(`/User/id/${id}`, fetcher);
    const router = useRouter()

    function goToTrip(id: string) {
        router.push(`trip/${id}`)
    }

    return <DefaultLayout>
        <StandardBox style={{display: "flex", flexDirection: "column", gap: "1rem"}}><h1>{com.t("yourAchievements")}:</h1>
            {(userSWR.data !== undefined && userSWR.data !== null && userSWR.data.achievements.length !== 0) ? userSWR.data?.achievements.map((v, i) => <StandardBox
                style={{background: "var(--secondary)"}} key={i}><AchiInsideContent>
                <p>{i + 1}</p> <p
                style={{gridArea: "b", fontWeight: "bold", padding: "0 0 0.5rem 0"}}>{t(v.achievementId+".name")}</p>
                <p style={{gridArea: "c", padding: "0 0 0.5rem 0"}}>{t(v.achievementId+".desc")}</p>
                <p style={{gridArea: "e"}}>{com.t("achieved")}: {DateTime.fromISO(v.timeAchieved).toLocaleString(DateTime.DATETIME_MED)}</p>
                <Button style={{gridArea: "d"}} variant={"contained"}
                        onClick={() => goToTrip(v.achievedOnTripId)}>{com.t("goToTrip")}</Button>
            </AchiInsideContent>
            </StandardBox>) : <StandardBox style={{background: "var(--secondary)"}}>{com.t("noAchievements")}</StandardBox>}
        </StandardBox>

    </DefaultLayout>;
}
