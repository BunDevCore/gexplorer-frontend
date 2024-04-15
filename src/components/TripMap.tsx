import mapboxgl from "mapbox-gl";
import {useEffect, useRef, useState} from "react";
import {GeoJSON} from "geojson";

export default function TripMap({tripGeometry}: { tripGeometry: GeoJSON.Geometry }) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<null | mapboxgl.Map>(null);
    const [lng, setLng] = useState(18.63);
    const [lat, setLat] = useState(54.35);
    const [zoom, setZoom] = useState(11);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            //@ts-ignore
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            attributionControl: false,
            center: [lng, lat],
            zoom: zoom

        });

        map.current.on('move', () => {
            setLng(map.current?.getCenter().lng!);
            setLat(map.current?.getCenter().lat!);
            setZoom(map.current?.getZoom()!);
        });

        map.current.on('load', () => {
            map.current?.addSource(
                'explored',
                {
                    type: 'geojson',
                    buffer: 99,
                    data: tripGeometry
                }
            )

            map.current?.addLayer({
                'id': 'explored',
                // minzoom: 15,
                // maxzoom: 18,
                'type': 'line',
                'source': 'explored', // reference the data source
                'layout': {},
                'paint': {
                    // 'fill-color': '#0080ff', // blue color fill
                    // 'fill-opacity': 0.5,
                    // "fill-antialias": false,
                    "line-color": '#0080ff',
                }
            });
            map.current?.addLayer({
                'id': 'explored2',
                minzoom: 12,
                // maxzoom: 18,
                'type': 'fill',
                'source': 'explored', // reference the data source
                'layout': {},
                'paint': {
                    'fill-color': '#0080ff', // blue color fill
                    'fill-opacity': 0.2,
                    "fill-antialias": true,
                    // "line-color": '#0080ff',
                }
            });
        });
    });


    return <div style={{marginTop: "-10rem", overflow: "hidden"}}>
        <div style={{height: "100vh", width: "100vw", overflow: "hidden"}} ref={mapContainer} className="map-container"/>
    </div>;
}