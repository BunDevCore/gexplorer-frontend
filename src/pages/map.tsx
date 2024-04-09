import {useEffect, useRef, useState} from "react";
import mapboxgl from "mapbox-gl";
import {
    MapBox,
    MapDarkener,
    MenuBox,
    MenuButton,
    MenuLink,
    MenuTitle, POIlistItem, POIdesc,
    POIimage,
    InfoList, POIlist,
    InfoSubtitle,
    InfoTitle, POIwebsite, POIminiMenu, POIminiMenuItem, MenuItem, DeparturesList, DeparturesListItem
} from "@/styles/map";
import {useRouter} from "next/router";
import {useDebounceCallback} from "usehooks-ts";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import HomeIcon from '@mui/icons-material/Home';
import Image from "next/image";
import PlaceIcon from '@mui/icons-material/Place';
import PublicIcon from '@mui/icons-material/Public';
import {Separator} from "@/styles/universal";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RouteIcon from '@mui/icons-material/Route';
import SearchIcon from '@mui/icons-material/Search';
import PhoneIcon from '@mui/icons-material/Phone';
import {useGExplorerStore} from "@/state";
import POIs from "../../public/geo/poi.json";
import "mapbox-gl/dist/mapbox-gl.css";
import {
    GAITPropertiesStop,
    GAITPropertiesVehicle,
    GAITStop,
    GAITStopDepartures,
    GAITVehicle,
    POIProperties
} from "@/types/map";
import type {GeoJSON} from "geojson";

export default function MapPage() {
    const {lang} = useTranslation("map");
    const [menuOpen, setMenuOpen] = useState(false);
    const mapContainer = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const replaceRouter = useDebounceCallback(router.replace, 500);
    const [dataProperties, setDataProperties] = useState<POIProperties | GAITPropertiesVehicle | GAITPropertiesStop | null>(null)
    const [dataType, setDataType] = useState<"POI" | "vehicle" | "stop" | null>(null)

    // @ts-ignore
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const lng = Number(params.get("lng") ?? 18.63);
        const lat = Number(params.get("lat") ?? 54.35);
        const zoom = Number(params.get("zoom") ?? 11);
        const map = new mapboxgl.Map({
            // @ts-ignore
            container: mapContainer.current,
            default: false,
            style: 'mapbox://styles/mapbox/streets-v12',
            attributionControl: false,
            dragRotate: true,
            center: [lng, lat],
            zoom: zoom,
        });

        map.on('move', () => {
            params.set("lng", String(map.getCenter().lng));
            params.set("lat", String(map.getCenter().lat));
            params.set("zoom", String(map.getZoom()));
            params.delete("select");
            replaceRouter(router.pathname + '?' + params)
        });

        map.on('load', () => {
            const selected = params.get("select");
            if (selected !== null) {
                for (let i = 0; i < POIs.features.length; i++) {
                    if (POIs.features[i].properties.id === selected) {
                        //@ts-ignore it works
                        setDataProperties(POIs.features[i].properties)
                        setMenuOpen(true);
                        map.flyTo({
                            // @ts-ignore coordinates exist in geometry
                            center: POIs.features[i].geometry.coordinates,
                            zoom: 16
                        })
                    }
                }
            }

            map.addSource("mapbox-dem", {
                type: "raster-dem",
                url: "mapbox://mapbox.mapbox-terrain-dem-v1",
                tileSize: 512,
            });
            map.setTerrain({source: "mapbox-dem"});

            map.resize();
            let labels = ['country-label', 'state-label',
                'airport-label', 'poi-label', 'water-point-label',
                'water-line-label', 'natural-point-label',
                'natural-line-label', 'waterway-label', 'road-label'];

            labels.forEach((label => {
                map.setLayoutProperty(label, 'text-field', [
                    'get',
                    `name_${lang !== "pl" ? lang : "en"}`
                ]);
            }));

            map.addSource("g-poi", {
                type: "geojson",
                data: POIs as GeoJSON.FeatureCollection<GeoJSON.Geometry>
            });

            map.loadImage("/logos/gexplorer_logo.png", (e, image) => {
                if (!e && image !== undefined) {
                    map.addImage("gexplorer-icon", image);

                    map.addLayer({
                        "id": "gdansk-layer",
                        "type": "symbol",
                        "source": "g-poi",
                        "layout": {
                            "icon-rotate": 180,
                            "icon-keep-upright": true,
                            "icon-rotation-alignment": "viewport",
                            "icon-image": "gexplorer-icon",
                            "icon-size": 0.025
                        }
                    });
                }
            });

            (async () => {
                const geojsonStops: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
                    type: "FeatureCollection",
                    features: []
                };
                // see: https://ckan.multimediagdansk.pl/dataset/tristar/resource/4c4025f0-01bf-41f7-a39f-d156d201b82b
                let rawData = await fetch("https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4c4025f0-01bf-41f7-a39f-d156d201b82b/download/stops.json");
                let jsonData = await rawData.json();
                let stops: { lastUpdate: string, stops: GAITStop[] } = jsonData[new Date().toISOString().split("T")[0]]
                for (let i = 0; i < stops.stops.length; i++) {
                    if (stops.stops[i].virtual || stops.stops[i].nonpassenger || stops.stops[i].depot) continue;
                    geojsonStops.features.push({
                        "type": "Feature",
                        "properties": {
                            "type": "stop",
                            "id": stops.stops[i].stopId,
                            "code": stops.stops[i].stopCode,
                            "name": stops.stops[i].stopName,
                            "desc": stops.stops[i].stopDesc,
                            "onDemand": Boolean(stops.stops[i].onDemand),
                            "ticketZoneBorder": Boolean(stops.stops[i].ticketZoneBorder),
                        },
                        "geometry": {
                            "coordinates": [
                                stops.stops[i].stopLon,
                                stops.stops[i].stopLat
                            ],
                            "type": "Point"
                        }
                    },)
                }
                map.addSource("gait-stops", {
                    type: "geojson",
                    data: geojsonStops
                });
                map.addLayer({
                    "id": "gait-stops-layer",
                    "type": "circle",
                    "minzoom": 14,
                    "source": "gait-stops",
                    "paint": {
                        "circle-radius": 4,
                        "circle-stroke-width": 2,
                        "circle-color": "#009dff",
                        "circle-stroke-color": "black"
                    }
                });

                const geojsonVehicles = await getGEOjsonVehicles();
                map.addSource("gait-vehicles", {
                    type: "geojson",
                    data: geojsonVehicles
                });
                map.addLayer({
                    "id": "gait-vehicles-layer",
                    "type": "circle",
                    "minzoom": 12,
                    "source": "gait-vehicles",
                    "paint": {
                        "circle-radius": 6,
                        "circle-stroke-width": 2,
                        "circle-color": "#97d9ff",
                        "circle-stroke-color": "black"
                    }
                });
            })();
        });

        const updateVehicleMarkers = setInterval(async () => {
            const geojsonVehicles = await getGEOjsonVehicles();
            if (geojsonVehicles === undefined) return;
            // @ts-ignore setData exists in getSource when the source is of type geojson smh
            map.getSource("gait-vehicles")?.setData(geojsonVehicles)
        }, 5000);

        map.on("click", (event) => {
            const features = map.queryRenderedFeatures(event.point, {
                layers: ["gdansk-layer", "gait-stops-layer", "gait-vehicles-layer"]
            });
            if (!features?.length) {
                return;
            }
            const feature = features[0];
            if (feature.properties) {
                setDataType(feature.properties.type)
                // @ts-ignore
                setDataProperties(feature.properties)
                if (feature.properties.type === "POI") {
                    params.set("select", feature.properties?.id);
                    replaceRouter(router.pathname + '?' + params);
                }
            }
            map.flyTo({
                // @ts-ignore coordinates exist in geometry
                center: feature.geometry.coordinates,
                zoom: 16
            }, event)
            setMenuOpen(true);
        });

        return () => {
            clearInterval(updateVehicleMarkers);
            map.remove()
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        setDataProperties(null);
    }

    const toggleMenuOrBack = () => {
        if (dataProperties !== null) {
            setMenuOpen(true);
        } else {
            setMenuOpen(!menuOpen);
        }
        setDataProperties(null);
    }

    const menuIconX = 10;
    const menuIconY = 48 / 2;
    const menuIconSpacing = 10;

    const sideBox = () => {
        if (dataProperties === null) {
            return <MapMenu/>;
        }
        switch (dataType) {
            case "POI":
                return <SelectedPOI POI={dataProperties as POIProperties}/>;
            case "vehicle":
                return <SelectedPOI POI={dataProperties as POIProperties}/>;
            case "stop":
                return <SelectedStops Stop={dataProperties as GAITPropertiesStop}/>;
        }
    };

    return <div style={{position: "relative"}}>
        <Head>
            <meta name="viewport"
                  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
        </Head>
        <MapBox ref={mapContainer}/>
        <MenuButton onClick={toggleMenuOrBack} $open={menuOpen}>
            {dataProperties !== null ? <svg
                    width="48"
                    height="48"
                    style={{
                        strokeLinecap: "round",
                        strokeWidth: 3,
                        transition: "300ms",
                        transform: "translate(-50%, -50%)"
                    }}>
                    <line x1={18} y1={24} x2={48 - 18} y2={12}/>
                    <line x1={18} y1={24} x2={48 - 18} y2={48 - 12}/>
                </svg> :
                <svg
                    width="48"
                    height="48"
                    style={{
                        strokeLinecap: "round",
                        strokeWidth: 2.5,
                        transition: "300ms",
                        transform: "translate(-50%, -50%)"
                    }}>
                    <line x1={menuIconX} y1={menuIconY - menuIconSpacing} x2={48 - menuIconX}
                          y2={menuIconY - menuIconSpacing}
                          style={{
                              ...menuOpen ? {
                                  transform: `translate(${menuIconSpacing}px, ${menuIconY - menuIconSpacing}px) rotate(45deg)`
                              } : {}, transition: "inherit", transformOrigin: "top"
                          }}/>
                    <line x1={menuIconX} y1={menuIconY} x2={48 - menuIconX} y2={menuIconY}
                          style={{opacity: Number(!menuOpen), transition: "inherit"}}/>
                    <line x1={menuIconX} y1={menuIconY + menuIconSpacing} x2={48 - menuIconX}
                          y2={menuIconY + menuIconSpacing}
                          style={{
                              ...menuOpen ? {
                                  transform: `translate(${menuIconSpacing}px, -${menuIconY - menuIconSpacing}px) rotate(-45deg)`
                              } : {}, transition: "inherit", transformOrigin: "bottom"
                          }}/>
                </svg>}
        </MenuButton>
        <MenuBox $open={menuOpen}>
            {sideBox()}
        </MenuBox>
        <MapDarkener $open={menuOpen} onClick={toggleMenu}/>
    </div>;
}

const MapMenu = () => {
    const {t} = useTranslation("map")
    return <>
        <MenuTitle href={"/"}>Gexplorer</MenuTitle>
        <MenuLink href="/"><HomeIcon/> <p>{t("home", null, {ns: "navbar"})}</p></MenuLink>
        <MenuItem><SearchIcon/> <p>{t("search")}</p></MenuItem>
        <MenuItem><RouteIcon/> <p>{t("routes")}</p></MenuItem>
        <MenuItem><FavoriteIcon/> <p>{t("saved")}</p></MenuItem>
    </>
}

const SelectedPOI = ({POI}: { POI: POIProperties }) => {
    const router = useRouter()
    const {t} = useTranslation("poi");
    const loggedIn = useGExplorerStore(s => s.loggedIn);

    // TODO: if logged try to send request
    const save = () => {
        if (!loggedIn) {
            router.push("/account?cb=/map?select=" + POI.id)
        }
    }
    const been = () => {
        if (!loggedIn) {
            router.push("/account?cb=/map?select=" + POI.id)
        }
    }
    return <>
        <MenuTitle href={"/"}>Gexplorer</MenuTitle>
        <InfoList>
            <POIimage>
                <Image src={"/geo/images/" + POI.image} alt={POI.title} fill={true}/>
            </POIimage>
            <InfoTitle>
                {POI.title}
                <InfoSubtitle>
                    {POI.category}
                </InfoSubtitle>
            </InfoTitle>
            <POIminiMenu>
                <POIminiMenuItem onClick={save}>
                    <i><FavoriteIcon/></i> <p>{t("save", null, {ns: "map"})}</p>
                </POIminiMenuItem>
                <POIminiMenuItem onClick={been}>
                    <i><BeenhereIcon/></i> <p>{t("visited", null, {ns: "map"})}</p>
                </POIminiMenuItem>
            </POIminiMenu>
            {POI.description ? <Separator/> : <></>}
            {POI.description ? <POIdesc>{POI.description}</POIdesc> : <></>}
            <Separator/>
            <POIlist>
                {POI.address ? <POIlistItem><PlaceIcon/> <p>{POI.address}</p></POIlistItem> : <></>}
                {POI.phone ? <POIlistItem><PhoneIcon/> <p>{POI.phone}</p></POIlistItem> : <></>}
                {POI.website ? <POIlistItem><PublicIcon/> <POIwebsite
                    href={POI.website}>{POI.website}</POIwebsite></POIlistItem> : <></>}
            </POIlist>
        </InfoList>
    </>
}

const SelectedStops = ({Stop}: { Stop: GAITPropertiesStop }) => {
    console.log(Stop);
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
            <DeparturesList>
                {departures === null ? <div>NOTHING TO FIND HERE</div> :
                    departures.departures.map(v => <DeparturesListItem key={v.id+v.routeShortName+v.estimatedTime}>
                        <p>{v.routeShortName}</p> <p>{v.headsign}</p>
                         {/* @ts-ignore numbers numbering the numbers */}
                        <p>{Math.max(Math.floor((new Date(v.estimatedTime) - Date.now()) / 60000), 0)} min</p>
                    </DeparturesListItem>)}
            </DeparturesList>
        </InfoList>
    </>
}

async function getGEOjsonVehicles(): Promise<GeoJSON.FeatureCollection<GeoJSON.Geometry>> {
    const geojsonVehicles: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
        type: "FeatureCollection",
        features: []
    };
    // see: https://ckan.multimediagdansk.pl/dataset/tristar/resource/4c4025f0-01bf-41f7-a39f-d156d201b82b
    let rawDataVehicle = await fetch("https://ckan2.multimediagdansk.pl/gpsPositions?v=2");
    let vehicles: { lastUpdate: string, vehicles: GAITVehicle[] } = await rawDataVehicle.json();
    for (let i = 0; i < vehicles.vehicles.length; i++) {
        geojsonVehicles.features.push({
            "type": "Feature",
            "properties": {
                "type": "vehicle",
                "id": "vehicle-" + vehicles.vehicles[i].vehicleCode,
                "code": vehicles.vehicles[i].vehicleCode,
                "name": vehicles.vehicles[i].routeShortName,
                "generated": vehicles.vehicles[i].generated,
                "headsign": vehicles.vehicles[i].headsign,
            },
            "geometry": {
                "coordinates": [
                    vehicles.vehicles[i].lon,
                    vehicles.vehicles[i].lat
                ],
                "type": "Point"
            }
        },)
    }
    return geojsonVehicles;
}