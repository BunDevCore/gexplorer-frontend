import {GAITPropertiesStop, GAITStopDepartures} from "@/types/map";
import {useEffect, useState} from "react";
import {
    ChangingList,
    ChangingListFull,
    ChangingListItem,
    InfoList,
    InfoSubtitle,
    InfoTitle,
    MenuTitle
} from "@/styles/map";

export default function SelectedStops({Stop}: { Stop: GAITPropertiesStop }) {
    const [departures, setDepartures] = useState<{ lastUpdate: string, departures: GAITStopDepartures[] } | null>(null);
    useEffect(() => {
        fetch("https://ckan2.multimediagdansk.pl/departures?stopId=" + Stop.id)
            .then(v => v.json())
            .then(v => setDepartures(v));
    }, []);

    return <>
        <MenuTitle href={"/"}>Gexplorer</MenuTitle>
        <InfoList>
            <InfoTitle>
                {Stop.name}
                <InfoSubtitle>
                    {Stop.desc} {Stop.code}
                </InfoSubtitle>
            </InfoTitle>
            <ChangingList>
                {departures === null || departures.departures.length === 0 ?
                    <ChangingListFull>Ciemno wszęǳie, głucho wszęǳie, Co to bęǳie, co to bęǳie?</ChangingListFull> :
                    departures.departures.map(v => <ChangingListItem key={v.id + v.routeShortName + v.estimatedTime}>
                        <p>{v.routeShortName}</p> <p>{v.headsign}</p>
                        {/* @ts-ignore numbers numbering the numbers */}
                        <p>{Math.max(Math.floor((new Date(v.estimatedTime) - Date.now()) / 60000), 0)} min</p>
                    </ChangingListItem>)}
            </ChangingList>
        </InfoList>
    </>
}