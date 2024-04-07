import React from "react";
import {useGExplorerStore} from "@/state";
import {DefaultLayout, StandardBox} from "@/styles/universal";
import {FullUser, Trip, DistrictAreas, District} from "@/types/types";
import useSWR from "swr";
import fetcher from "@/fetcher";
import LoadingComponent from "@/components/LoadingComponent";
import AreaCounter from "@/components/AreaCounter";
import {DateTime} from "luxon";
import {UserPaper} from "@/styles/userpage";
import {useRouter} from "next/router";
import Button from "@mui/material/Button";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import PercentCounter from "@/components/PercentCounter";

export default function ProfileComponent(props: { username: string | undefined | null }) {
    const districts = useGExplorerStore(s => s.districts)
    const {data, error, isLoading} = useSWR<FullUser>(`/User/id/${props.username}`, fetcher)
    const router = useRouter()

    function goToTrip(id: string) {
        router.push(`trip/${id}`)
    }

    if (isLoading || data === undefined) return <LoadingComponent></LoadingComponent>

    const districtCompletionInfo = getDistrictCompletionInfo(data.districtAreas, Object.values(districts));
    console.log(districtCompletionInfo)

    return <DefaultLayout>
        <StandardBox>
            <h1>Cześć {data.username}!</h1>
            <h1>Odkrył_ś <AreaCounter area={data.overallAreaAmount}></AreaCounter></h1>
            <h2>Twoje ostatnie podróże:</h2>
            {data.trips.map(t => TripListEntry({t: t, onclick: () => goToTrip(t.id)}))}
            {/*<h3>uwaga podaje dzielnice!!!</h3>*/}
            {/*{Object.values(districts).map(d => <p>{d.name} <i>{d.area / 1000000}</i> km2</p>)}*/}

            <h2>Dzielnice</h2>
            <TableContainer component={UserPaper} elevation={14}><Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Dzielnica
                        </TableCell>
                        <TableCell>
                            Odkryte pole
                        </TableCell>
                        <TableCell>
                            Pole dzielnicy
                        </TableCell>
                        <TableCell>
                            Poziom eksploracji
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {districtCompletionInfo.map(districtInfo => {
                        return <TableRow component={"th"} key={districtInfo.name}>
                            <TableCell sx={{fontSize: "1.4rem", width: "5rem"}}>{districtInfo.name}</TableCell>
                            <TableCell sx={{fontSize: "1.4rem"}}>
                                <AreaCounter area={districtInfo.explored}></AreaCounter>
                            </TableCell>
                            <TableCell sx={{fontSize: "1.1rem"}}>
                                <AreaCounter area={districtInfo.total}></AreaCounter>
                            </TableCell>
                            <TableCell sx={{fontSize: "1.4rem"}} align={"right"}>
                                <PercentCounter percent={districtInfo.percentage}></PercentCounter>
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table></TableContainer>
        </StandardBox>
    </DefaultLayout>;
}

function getDistrictCompletionInfo(districtAreas: DistrictAreas, districts: District[]): {
    name: string,
    explored: number,
    total: number,
    percentage: number
}[] {
    return districts.map(x => ({
        name: x.name,
        explored: districtAreas[x.id],
        total: x.area,
        percentage: districtAreas[x.id] / x.area * 100
    })).sort(districtInfoSortFn);
}

// @ts-ignore
function districtInfoSortFn(x, y) {
    const percentageDelta = y.percentage - x.percentage;
    if (percentageDelta != 0) return percentageDelta

    return y.total - x.total
}

//TODO: make this look bearable @LempekPL
function TripListEntry({t, onclick}: { t: Trip, onclick: any }) {
    return <UserPaper>
        {DateTime.fromISO(t.startTime).toLocaleString(DateTime.DATETIME_MED)} - {t.area} m<sup>2</sup> (+{t.newArea} m<sup>2</sup>)
        <Button variant={"contained"} onClick={onclick}>Go to trip</Button>
    </UserPaper>
}