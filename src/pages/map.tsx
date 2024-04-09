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
    POIinfo, POIlist,
    POIsubtitle,
    POItitle, POIwebsite, POIminiMenu, POIminiMenuItem, MenuItem
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

// TODO: move to separate types file
type POIProperties = {
    id: string
    title: string
    type: string
    description: string
    image: string
    address: string | null
    phone: string | null
    website: string | null
}

export default function MapPage() {
    const {lang} = useTranslation("map");
    const [menuOpen, setMenuOpen] = useState(false);
    const mapContainer = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const replaceRouter = useDebounceCallback(router.replace, 500);
    const [POI, setPOI] = useState<POIProperties | null>(null)

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
                        // @ts-ignore it works
                        setPOI(POIs.features[i].properties)
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
                data: POIs as any
            });

            map.loadImage("/logos/gexplorer_logo.png", (e, image) => {
                if (!e && image !== undefined) {
                    map.addImage("gexplorer-icon", image);
                }
            });

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
        });

        map.on('click', (event) => {
            const features = map.queryRenderedFeatures(event.point, {
                layers: ['gdansk-layer']
            });
            if (!features?.length) {
                return;
            }
            const feature = features[0];
            if (feature.properties) {
                setPOI(feature.properties as POIProperties);
            }
            map.flyTo({
                // @ts-ignore coordinates exist in geometry
                center: feature.geometry.coordinates,
                zoom: 16
            }, event)
            setMenuOpen(true);
            params.set("select", feature.properties?.id);
            replaceRouter(router.pathname + '?' + params)
        });

        return () => map.remove();
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        setPOI(null);
    }

    const toggleMenuOrBack = () => {
        if (POI !== null) {
            setMenuOpen(true);
        } else {
            setMenuOpen(!menuOpen);
        }
        setPOI(null);
    }

    const menuIconX = 10;
    const menuIconY = 48 / 2;
    const menuIconSpacing = 10;

    return <div style={{position: "relative"}}>
        <Head>
            <meta name="viewport"
                  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
        </Head>
        <MapBox ref={mapContainer}/>
        <MenuButton onClick={toggleMenuOrBack} $open={menuOpen}>
            {POI !== null ? <svg
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
            {POI === null ? <MapMenu/> : <SelectedPOI POI={POI}/>}
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
        <POIinfo>
            <POIimage>
                <Image src={"/geo/images/" + POI.image} alt={POI.title} fill={true}/>
            </POIimage>
            <POItitle>
                {POI.title}
                <POIsubtitle>
                    {POI.type}
                </POIsubtitle>
            </POItitle>
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
        </POIinfo>
    </>
}