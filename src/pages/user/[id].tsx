import useSWR from "swr";
import {apiUrl} from "@/config";
import {useRouter} from "next/router";
import {useGExplorerStore} from "@/state";
import React, {useEffect, useState} from "react";
import fetcher from "@/fetcher";
import {CenterLayout, MainLayout} from "@/styles/universal";
import {Avatar, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {DistrictAreas, FullUser} from "@/types/types";
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

function BigProfileBanner({user}: { user: FullUser }) {
    return <Grid container spacing={2} sx={{padding: 1}}>
        <Grid item xs={2}>
            <Avatar sx={{width: "100%", height: "unset", aspectRatio: 1}}></Avatar>
        </Grid>
        <Grid item xs={10}>
            <h1>{user.username}</h1>
            <h3 style={{display: "inline"}}>{user.overallAreaAmount.toFixed(0)}&nbsp;m<sup>2</sup>&nbsp;</h3>
            <FollowTheSignsIcon/> x{user.tripAmount}
            <hr/>
            <div><PersonAddAltIcon/> {new Date(Date.parse(user.joinedAt)).toLocaleDateString()}</div>
        </Grid>
    </Grid>
}

function DistrictTable({areas}: { areas: DistrictAreas }) {
    const {t} = useTranslation("common");
    const districts = useGExplorerStore(x => x.districts);

    function calculateDistrictPercentage(id: string, area: number) {
        return ((area / districts[id].area) * 100);
    }

    return <TableContainer component={UserPaper} elevation={14}><Table>
        <TableHead>
            <TableRow>
                <TableCell>
                    {t("districtHeader")}
                </TableCell>
                <TableCell>
                    {t("areaHeader")}
                </TableCell>
                <TableCell>
                    {t("percentHeader")}
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {Object.entries(areas).map(([areaId, areaAmount]) => {
                return <TableRow component={"th"} key={areaId}>
                    <TableCell>{districts[areaId].name ?? "???"}</TableCell>
                    <TableCell align={"right"}><AreaCounter area={areaAmount}/></TableCell>
                    <TableCell align={"right"}><PercentCounter
                        percent={calculateDistrictPercentage(areaId, areaAmount)}/></TableCell>
                </TableRow>
            })}
        </TableBody>
    </Table></TableContainer>
}

export default function UserPage() {
    const {t} = useTranslation("common");
    const router = useRouter()
    const [id, setId] = useState<string | null>(null);

    const loggedIn = useGExplorerStore(s => s.loggedIn);
    const triedAuthenticating = useGExplorerStore(s => s.initialAuthDone);
    const [tab, setTab] = useState(0);

    useEffect(() => {
        console.warn("li")
        console.warn(loggedIn)
        if (!triedAuthenticating) return;
        if (!loggedIn) router.push("/login")
    }, [loggedIn, triedAuthenticating])

    useEffect(() => {
        const id = router.query.id;
        console.warn(id)
        setId(id as string)
    }, [router]);


    console.log("swr")
    console.log(id)
    const userSwr = useSWR<FullUser>(apiUrl(`/User/id/${id}`), fetcher);
    const polygonSwr = useSWR<Polygon[]>(apiUrl(`/User/id/${id}/polygon`), fetcher);

    if (userSwr.isLoading || !userSwr.data) return <CenterLayout><p>loading...</p></CenterLayout>

    // <Box sx={{paddingBottom: "1rem"}}>
    //     <Tabs value={login} onChange={changeLogin} aria-label="login tabs" centered>
    //         <Tab label="Zaloguj się"/>
    //         <Tab label="Zarejestruj się"/>
    //     </Tabs>
    // </Box>

    const tabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    function getTabContent() {
        if (userSwr.data === undefined) return <></>;
        if (polygonSwr.data === undefined) return <></>;

        switch (tab) {
            case 0:
                return <DistrictTable areas={userSwr.data.districtAreas}/>
            case 1:
                console.log(polygonSwr.data)
                return <TripMap tripGeometry={makeMultiPolygon(polygonSwr.data)}></TripMap>
        }
    }

    return <MainLayout><CenterLayout><UserPaper variant={"outlined"} elevation={4}>
        <BigProfileBanner user={userSwr.data}></BigProfileBanner>

        <Box sx={{paddingBottom: "1rem"}}>
            <Tabs value={tab} onChange={tabChange}>
                <Tab label={t("districtAreas")}/>
                <Tab label={t("overallArea")}/>
            </Tabs>
        </Box>

        {getTabContent()}

        {/*<h2>{t("districtAreas")}</h2>*/}
        {/*<DistrictTable areas={userSwr.data.districtAreas}/>*/}
    </UserPaper></CenterLayout></MainLayout>
}