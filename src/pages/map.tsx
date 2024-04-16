import {useEffect, useRef, useState} from "react";
import mapboxgl, {NavigationControl} from "mapbox-gl";
import {
    MapBox,
    MapDarkener,
    MenuBox,
    MenuButton,
    MenuLink,
    MenuTitle,
    BackButton
} from "@/styles/map";
import {useRouter} from "next/router";
import {useDebounceCallback} from "usehooks-ts";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import POIs from "../../public/geo/poi.json";
import "mapbox-gl/dist/mapbox-gl.css";
import {
    GAITPropertiesStop,
    GAITPropertiesVehicle,
    GAITRoutes,
    GAITStop,
    GAITVehicle,
    POIProperties
} from "@/types/map";
import {GeoJSON, Polygon} from "geojson";
import SelectedPOI from "@/components/map/POI";
import SelectedVehicles from "@/components/map/Vehicle";
import SelectedStops from "@/components/map/Stop";
import SettingsIcon from '@mui/icons-material/Settings';
import {getCookie} from "cookies-next";
import useSWR from "swr";
import fetcher from "@/fetcher";
import {useGExplorerStore} from "@/state";
import {makeMultiPolygon} from "@/topologyUtils";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function MapPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const mapContainer = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const replaceRouter = useDebounceCallback((url) => router.replace(url, undefined, {shallow: true}), 500);
    const [dataProperties, setDataProperties] = useState<POIProperties | GAITPropertiesVehicle | GAITPropertiesStop | null>(null)
    const [dataType, setDataType] = useState<"POI" | "vehicle" | "stop" | null>(null);
    const loggedIn = useGExplorerStore(s => s.loggedIn)
    const user = useGExplorerStore(s => s.id)
    const polygonSwr = useSWR<Polygon[]>(`/User/id/${user}/polygon`, fetcher);

    // @ts-ignore
    useEffect(() => {

        const params = new URLSearchParams(window.location.search);
        const lng = Number(params.get("lng") ?? 18.63);
        const lat = Number(params.get("lat") ?? 54.35);
        const zoom = Number(params.get("zoom") ?? 11);
        const rot = Number(params.get("rot") ?? 0);
        const pit = Number(params.get("pit") ?? 0);
        const map = new mapboxgl.Map({
            // @ts-ignore
            container: mapContainer.current,
            default: true,
            style: "mapbox://styles/mapbox/streets-v12",
            attributionControl: false,
            dragRotate: true,
            maxPitch: 50,
            center: [lng, lat],
            zoom: zoom,
            bearing: rot,
            pitch: pit
        });

        map.on('move', () => {
            params.set("lng", String(map.getCenter().lng));
            params.set("lat", String(map.getCenter().lat));
            params.set("zoom", String(map.getZoom()));
            params.set("rot", String(map.getBearing()));
            params.set("pit", String(map.getPitch()));
            params.delete("select");
            replaceRouter(router.pathname + '?' + params)
        });

        map.on('load', () => {
            const disableTransport = Boolean(getCookie("MAP_TRANSPORT") ?? false);
            const disablePOIs = Boolean(getCookie("MAP_POI") ?? false);
            const disableExplored = Boolean(getCookie("MAP_EXPLORED") ?? false);

            // 3d buildings
            map.addLayer({
                    'id': 'add-3d-buildings',
                    'source': 'composite',
                    'source-layer': 'building',
                    'filter': ['==', 'extrude', 'true'],
                    'type': 'fill-extrusion',
                    'minzoom': 15,
                    'paint': {
                        'fill-extrusion-color': '#aaa',
                        'fill-extrusion-height': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'height']
                        ],
                        'fill-extrusion-base': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'min_height']
                        ],
                        'fill-extrusion-opacity': 0.6
                    }
                }, "building-entrance"
            );

            let nav = new NavigationControl({
                showCompass: true,
                showZoom: true,
                visualizePitch: false
            })
            map.addControl(nav, "top-right");

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

            // CHANGING LABEL LANGUAGES DOESN'T WORK
            // they disappear
            // let labels = ['country-label', 'state-label',
            //     'airport-label', 'poi-label', 'water-point-label',
            //     'water-line-label', 'natural-point-label',
            //     'natural-line-label', 'waterway-label', 'road-label'];
            // if (lang !== "pl") {
            //     labels.forEach((label => {
            //         map.setLayoutProperty(label, 'text-field', [
            //             'get',
            //             `name_${lang}`
            //         ]);
            //     }));
            // }

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
                            "icon-allow-overlap": true,
                            "icon-ignore-placement": true,
                            "icon-rotate": 180,
                            "icon-keep-upright": true,
                            "icon-rotation-alignment": "viewport",
                            "icon-image": "gexplorer-icon",
                            "icon-size": 0.025,
                            "visibility": disablePOIs ? "none" : "visible"
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

                map.loadImage("/geo/images/bus-stop.png", (e, image) => {
                    if (!e && image !== undefined) {
                        map.addImage("bus-stop-icon", image);

                        map.addLayer({
                            "id": "gait-stops-layer",
                            "type": "symbol",
                            "minzoom": 14,
                            "source": "gait-stops",
                            "layout": {
                                "icon-rotation-alignment": "viewport",
                                "icon-image": "bus-stop-icon",
                                "icon-size": [
                                    "interpolate", ["exponential", 1.5], ["zoom"],
                                    14, 0.125,
                                    22, 0.45
                                ],
                                "icon-allow-overlap": true,
                                "icon-ignore-placement": true,
                                "icon-keep-upright": true,
                                "text-allow-overlap": true,
                                "text-anchor": "top",
                                "text-offset": [0, 1],
                                "text-size": ["step", ["zoom"], 0,
                                    17, 10
                                ],
                                "text-field": ["concat", ["get", "name"], " ", ["get", "code"]],
                                "visibility": disableTransport ? "none" : "visible"
                            },
                            "paint": {
                                "icon-color": "blue"
                            }
                        });
                    }
                });

                const geojsonVehicles = await getGEOjsonVehicles();
                map.addSource("gait-vehicles", {
                    type: "geojson",
                    data: geojsonVehicles
                });

                // vehicle point
                let bus = createImage(map, "/geo/images/bus.png", "bus-icon")
                let tram = createImage(map, "/geo/images/tram.png", "tram-icon")
                let ferry = createImage(map, "/geo/images/ferry.png", "ferry-icon")
                let unknownVehicle = createImage(map, "/geo/images/unknownVehicle.png", "unknown-vehicle-icon")
                let loadedAllIcons = bus && tram && ferry && unknownVehicle;
                if (loadedAllIcons) {
                    map.addLayer({
                        "id": "gait-vehicles-layer",
                        "type": "symbol",
                        "minzoom": 10,
                        "source": "gait-vehicles",
                        "layout": {
                            "text-field": ["get", "name"],
                            "text-anchor": "center",
                            "text-allow-overlap": true,
                            "text-font": ["Arial Unicode MS Bold"],
                            "text-size": ["interpolate", ["linear"], ["zoom"],
                                12, 0,
                                13, 0,
                                14, 10,
                                16, 10,
                                17, 16,
                                22, 16
                            ],
                            "icon-size": ["interpolate", ["linear"], ["zoom"],
                                12, .2,
                                13, .2,
                                14, .2,
                                15, .2,
                                16, .35,
                                17, .35,
                                22, .35
                            ],
                            "icon-allow-overlap": true,
                            "icon-ignore-placement": true,
                            "icon-keep-upright": true,
                            "icon-image": ["case",
                                ["==", "BUS", ["get", "vehicleType"]], "bus-icon",
                                ["==", "TRAM", ["get", "vehicleType"]], "tram-icon",
                                ["==", "FERRY", ["get", "vehicleType"]], "ferry-icon",
                                "unknown-vehicle-icon"
                            ],
                            "visibility": disableTransport ? "none" : "visible"
                        },
                        "paint": {
                            "text-color": "white"
                        }
                    });
                }

                // arrow pointing towards the way
                // cant offset icon when rotation aligment map
                // TODO: maybe fix in future with viewport aligment and mapbox Expressions
                // if (createImage(map, "/geo/images/directionArrow.png", "direction-arrow")) {
                //     map.addLayer({
                //         "id": "gait-vehicles-layer-arrow",
                //         "type": "symbol",
                //         "minzoom": 15,
                //         "source": "gait-vehicles",
                //         "layout": {
                //             "icon-rotation-alignment": "map",
                //             "icon-rotate": ["get", "direction"],
                //             "icon-image": "direction-arrow",
                //             "icon-size": .25,
                //             "icon-allow-overlap": true,
                //             "icon-ignore-placement": true,
                //             "icon-keep-upright": true,
                //         }
                //     });
                // }
            })();

            // ADD the explored area
            if (loggedIn && polygonSwr.data !== undefined && polygonSwr.data !== null) {
                const polygons = makeMultiPolygon(polygonSwr.data)
                map.addSource(
                    "explored-source",
                    {
                        type: "geojson",
                        buffer: 99,
                        data: polygons
                    }
                )
                map.addLayer({
                    "id": "explored",
                    "type": "line",
                    "source": "explored-source",
                    "layout": {
                        "visibility": disableExplored ? "none" : "visible"
                    },
                    "paint": {
                        "line-color": '#0080ff',
                    }
                });
                map.addLayer({
                    "id": "explored2",
                    "type": "fill",
                    "source": "explored-source",
                    "layout": {
                        "visibility": disableExplored ? "none" : "visible"
                    },
                    "paint": {
                        "fill-color": "#0080ff",
                        "fill-opacity": 0.2,
                        "fill-antialias": true,
                    }
                });
            }
        });

        const updateVehicleMarkers = setInterval(async () => {
            const geojsonVehicles = await getGEOjsonVehicles();
            if (!(geojsonVehicles === undefined || map === undefined || map === null)) {
                let src = map.getSource("gait-vehicles");
                if (src !== null && src !== undefined) {
                    // @ts-ignore setData exists in getSource when the source is of type geojson smh
                    src.setData(geojsonVehicles);
                }
            }
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
                zoom: dataType === "POI" ? 16 : 18
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

    const toggleBack = () => {
        setMenuOpen(true);
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
                return <SelectedVehicles Vehicle={dataProperties as GAITPropertiesVehicle}/>;
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
        <BackButton onClick={toggleBack} $open={menuOpen} $dataDisplayed={dataProperties !== null}>
            <svg
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
            </svg>
        </BackButton>
        <MenuButton onClick={toggleMenu} $open={menuOpen}>
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
            </svg>
        </MenuButton>
        <MenuBox $open={menuOpen}>
            {sideBox()}
        </MenuBox>
        <MapDarkener $open={menuOpen} onClick={toggleMenu}/>
    </div>;
}

const MapMenu = () => {
    const {t} = useTranslation("common")
    return <>
        <MenuTitle href={"/"}>Gexplorer</MenuTitle>
        <MenuLink href="/"><HomeIcon/> <p>{t("mainPage")}</p></MenuLink>
        <MenuLink href="/settings"><SettingsIcon/> <p>{t("settings")}</p></MenuLink>
        <MenuLink href="/account"><AccountCircleIcon/> <p>{t("account")}</p></MenuLink>
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
    let rawData = await fetch("https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/22313c56-5acf-41c7-a5fd-dc5dc72b3851/download/routes.json");
    let jsonData = await rawData.json();
    let routes: { lastUpdate: string, routes: GAITRoutes[] } = jsonData[new Date().toISOString().split("T")[0]]

    for (let i = 0; i < vehicles.vehicles.length; i++) {
        geojsonVehicles.features.push({
            "type": "Feature",
            "properties": {
                "type": "vehicle",
                "routeId": vehicles.vehicles[i].routeId,
                "tripId": vehicles.vehicles[i].tripId,
                "id": "vehicle-" + vehicles.vehicles[i].vehicleCode,
                "code": vehicles.vehicles[i].vehicleCode,
                "name": vehicles.vehicles[i].routeShortName,
                "generated": vehicles.vehicles[i].generated,
                "headsign": vehicles.vehicles[i].headsign,
                "vehicleType": routes.routes.find(v => v.routeId === vehicles.vehicles[i].routeId)?.routeType ?? "UNKNOWN",
                "direction": vehicles.vehicles[i].direction
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

function createImage(map: mapboxgl.Map, url: string, iconName: string): boolean {
    let ret = true;
    map.loadImage(url, (e, image) => {
        if ((e === null || e === undefined) && image !== undefined) {
            map.addImage(iconName, image);
        } else {
            console.warn(e);
            ret = false;
        }
    });
    return ret;

}