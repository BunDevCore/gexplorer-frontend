import useSWR from "swr";
import {useRouter} from "next/router";
import {useGExplorerStore} from "@/state";
import React, {useEffect, useState} from "react";
import fetcher from "@/fetcher";
import {CenterLayout, DefaultLayout, StandardBox} from "@/styles/universal";
import {Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Leaderboard} from "@/types/types";
import {UserPaper} from "@/styles/userpage";
import useTranslation from "next-translate/useTranslation";
import AreaCounter from "@/components/AreaCounter";

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
    const leaderboardSwr = useSWR<Leaderboard<number>>(`/Leaderboard/overall`, fetcher);

    if (leaderboardSwr.isLoading || !leaderboardSwr.data) return <CenterLayout><p>loading...</p></CenterLayout>

    return <DefaultLayout><StandardBox>
        <h1>{t("overallAreaLeaderboard")}</h1>
        <LeaderboardTable leaderboard={leaderboardSwr.data}/>
        {/*kurwa*/}
    </StandardBox></DefaultLayout>
}