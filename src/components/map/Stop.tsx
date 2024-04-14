import {GAITPropertiesStop, GAITStopDepartures} from "@/types/map";
import {useEffect, useState} from "react";
import {ChangingList, ChangingListItem, InfoList, InfoSubtitle, InfoTitle, MenuTitle} from "@/styles/map";

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
                {departures === null ? <div>NOTHING TO FIND HERE</div> :
                    departures.departures.map(v => <ChangingListItem key={v.id + v.routeShortName + v.estimatedTime}>
                        <p>{v.routeShortName}</p> <p>{v.headsign}</p>
                        {/* @ts-ignore numbers numbering the numbers */}
                        <p>{Math.max(Math.floor((new Date(v.estimatedTime) - Date.now()) / 60000), 0)} min</p>
                    </ChangingListItem>)}
            </ChangingList>
        </InfoList>
    </>
}