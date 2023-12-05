import useSWR from "swr";
import {apiUrl} from "@/config";
import {useRouter} from "next/router";
import {useGExplorerStore} from "@/state";
import React, {useEffect, useState} from "react";
import fetcher from "@/fetcher";
import {CenterLayout, MainLayout} from "@/styles/universal";
import {Avatar, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {DistrictAreas, FullUser, Leaderboard} from "@/types/types";
import {Geometry, Polygon} from "geojson";
import {UserPaper} from "@/styles/userpage";
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import useTranslation from "next-translate/useTranslation";
import AreaCounter from "@/components/AreaCounter";
import PercentCounter from "@/components/PercentCounter";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {makeMultiPolygon} from "@/topologyUtils";
import TripMap from "@/components/TripMap";

function LeaderboardTable({leaderboard}: { leaderboard: Leaderboard<number> }) {
    const {t} = useTranslation("common");

    return <TableContainer component={UserPaper} elevation={14}><Table>
        <TableHead>
            <TableRow>
                <TableCell>
                    {t("positionHeader")}
                </TableCell>
                <TableCell colSpan={2}>
                    {t("userNameHeader")}
                </TableCell>
                <TableCell>
                    {t("areaHeader")}
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {Object.entries(leaderboard).map(([position, leaderboardEntry]) => {
                return <TableRow component={"th"} key={leaderboardEntry.user.id}>
                    <TableCell sx={{fontSize: "1.4rem", width: "5rem"}}>{position}</TableCell>
                    <TableCell sx={{width: "64px"}}><Avatar></Avatar></TableCell>
                    <TableCell sx={{fontSize: "1.4rem"}}>
                        {leaderboardEntry.user.username}
                    </TableCell>
                    <TableCell align={"right"}><AreaCounter area={leaderboardEntry.value}/></TableCell>
                </TableRow>
            })}
        </TableBody>
    </Table></TableContainer>
}

export default function OverallLeaderboardPage() {
    const {t} = useTranslation("common");
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


    console.log("swr")
    console.log(id)
    const leaderboardSwr = useSWR<Leaderboard<number>>(apiUrl(`/Leaderboard/overall`), fetcher);

    if (leaderboardSwr.isLoading || !leaderboardSwr.data) return <CenterLayout><p>loading...</p></CenterLayout>

    return <MainLayout><CenterLayout><UserPaper variant={"outlined"} elevation={4}>
        <h1>{t("overallAreaLeaderboard")}</h1>
        <LeaderboardTable leaderboard={leaderboardSwr.data}/>
        {/*kurwa*/}
    </UserPaper></CenterLayout></MainLayout>
}