import {District, DistrictAreas} from "@/types/types";
import useTranslation from "next-translate/useTranslation";
import {useGExplorerStore} from "@/state";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {UserPaper} from "@/styles/userpage";
import AreaCounter from "@/components/AreaCounter";
import PercentCounter from "@/components/PercentCounter";
import React from "react";

export function DistrictTable({areas}: { areas: DistrictAreas }) {
    const {t} = useTranslation("common");
    const districts = useGExplorerStore(x => x.districts);

    let districtInfos = getDistrictCompletionInfo(areas, Object.values(districts));

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
                    {t("totalAreaHeader")}
                </TableCell>
                <TableCell>
                    {t("percentHeader")}
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {districtInfos.map(districtInfo => {
                return <TableRow component={"th"} key={districtInfo.name}>
                    <TableCell>{districtInfo.name}</TableCell>
                    <TableCell align={"right"}><AreaCounter area={districtInfo.explored}/></TableCell>
                    <TableCell align={"right"}><AreaCounter area={districtInfo.total}/></TableCell>
                    <TableCell align={"right"}><PercentCounter
                        percent={districtInfo.percentage}/></TableCell>
                </TableRow>
            })}
        </TableBody>
    </Table></TableContainer>
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