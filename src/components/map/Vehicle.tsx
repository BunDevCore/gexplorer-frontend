import {GAITPropertiesVehicle, GAITStop, GAITStopTimes} from "@/types/map";
import {
    ChangingList,
    ChangingListFull,
    ChangingListItem,
    InfoList,
    InfoSubtitle,
    InfoTitle,
    MenuTitle
} from "@/styles/map";
import type {GeoJSON} from "geojson";
import {useEffect, useState} from "react";

export default function SelectedVehicles({Vehicle}: { Vehicle: GAITPropertiesVehicle }) {
    console.log(Vehicle);
    const [stopTimes, setStopTimes] = useState<GAITStopTimes[] | null>(null);
    const [stops, setStops] = useState<GAITStop[] | null>(null);

    useEffect(() => {
        (async () => {
            // see: https://ckan.multimediagdansk.pl/dataset/tristar/resource/a023ceb0-8085-45f6-8261-02e6fcba7971
            let rawData = await fetch(`https://ckan2.multimediagdansk.pl/stopTimes?date=${new Date().toISOString().split("T")[0]}&routeId=${Vehicle.routeId}`);
            let stopTimesJSON: { lastUpdate: string, stopTimes: GAITStopTimes[] } = await rawData.json();
            setStopTimes(stopTimesJSON.stopTimes.filter(v => v.tripId === Vehicle.tripId));
            let rawDataStop = await fetch("https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4c4025f0-01bf-41f7-a39f-d156d201b82b/download/stops.json");
            let stopsJson = await rawDataStop.json();
            let stopsJson2: { lastUpdate: string, stops: GAITStop[] } = stopsJson[new Date().toISOString().split("T")[0]];
            setStops(stopsJson2.stops)
        })()
    }, []);

    return <>
        <MenuTitle href={"/"}>Gexplorer</MenuTitle>
        <InfoList>
            <InfoTitle>
                {Vehicle.name} {Vehicle.headsign}
                <InfoSubtitle>
                    {Vehicle.code}
                    {/* info about when last updated, decided not to add because you would need to update it constantly */}
                    {/*<InfoRight>{Vehicle.generated}</InfoRight>*/}
                </InfoSubtitle>
            </InfoTitle>
            {/* TODO: limit stops to the end of the route (ignore for now or try if you really want idc) */}
            <ChangingList>
                {stopTimes === null || stopTimes.length === 0 ?
                    <ChangingListFull>Ładowanie?</ChangingListFull> :
                    stopTimes.map((v, i) => !Boolean(v.virtual) && !Boolean(v.depot) && !Boolean(v.nonpassenger) &&
                    // @ts-ignore DO NOT TOUCH THIS CODE, EVER
                    Math.floor((new Date(new Date().toISOString().split("T")[0]+"T"+v.arrivalTime.split("T")[1]) - Date.now()) / 60000) > 0
                        ? <ChangingListItem key={v.tripId + v.stopShortName + v.arrivalTime}>
                        <p>{/*i + 1 BECAUSE of virtual, depot and nonpassenger stops it may increment when it shouldn't also the limit route problem (SEE to do above) */}</p><p>{stops?.find(s => s.stopId === v.stopId)?.stopDesc ?? "Ładowanie"}</p>
                        {/* @ts-ignore numbers */}
                        <p>{Math.max(Math.floor((new Date(new Date().toISOString().split("T")[0]+"T"+v.arrivalTime.split("T")[1]) - Date.now()) / 60000), 0)} min</p>
                    </ChangingListItem> : <></>)
                    }
            </ChangingList>
        </InfoList>
    </>
}