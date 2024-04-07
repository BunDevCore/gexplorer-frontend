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
    POItitle, POIwebsite, POIminiMenu, POIminiMenuItem
} from "@/styles/map";
import {redirect, useSearchParams} from "next/navigation";
import {useRouter} from "next/router";
import {useDebounceCallback} from "usehooks-ts";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import HomeIcon from '@mui/icons-material/Home';
import Image from "next/image";
import PlaceIcon from '@mui/icons-material/Place';
import PublicIcon from '@mui/icons-material/Public';
import {Separator} from "@/styles/universal";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import FavoriteIcon from '@mui/icons-material/Favorite';

// TODO: move to separate types file
type POIProperties = {
    "title": string,
    "type": string,
    "description": string,
    "image": string,
    "address": string | null,
    "website": string | null
}

export default function MapPage() {
    const {lang} = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<null | mapboxgl.Map>(null);
    const mapParams = useSearchParams();
    const router = useRouter();
    const params = new URLSearchParams(mapParams.toString());
    const replaceRouter = useDebounceCallback(router.replace, 500);

    const [zoomLoaded, setZoomLoaded] = useState(false);
    const [centerLoaded, setCenterLoaded] = useState(false);

    const [POI, setPOI] = useState<POIProperties | null>(null)

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            //@ts-ignore
            container: mapContainer.current,
            default: false,
            style: 'mapbox://styles/mapbox/streets-v12',
            attributionControl: false,
            center: [18.63, 54.35],
            zoom: 11,
        });

        map.current.on('move', () => {
            params.set("lng", String(map.current?.getCenter().lng));
            params.set("lat", String(map.current?.getCenter().lat));
            params.set("zoom", String(map.current?.getZoom()));
            replaceRouter(router.pathname + '?' + params)
        });

        map.current.on('load', () => {
            if (!map.current) return;
            map.current?.resize();
            let labels = ['country-label', 'state-label',
                'settlement-label', 'settlement-subdivision-label',
                'airport-label', 'poi-label', 'water-point-label',
                'water-line-label', 'natural-point-label',
                'natural-line-label', 'waterway-label', 'road-label'];

            labels.forEach((label => {
                map.current?.setLayoutProperty(label, 'text-field', [
                    'get',
                    `name_${lang !== "pl" ? lang : "en"}`
                ]);
            }));

            map.current?.addSource("g-poi", {
                type: "geojson",
                data: "/geo/poi.json"
            });

            map.current?.addLayer({
                "id": "gdansk-layer",
                "type": "circle",
                "source": "g-poi",
                'paint': {
                    "circle-radius": 4,
                    "circle-stroke-width": 2,
                    "circle-color": "#cf0000",
                    "circle-stroke-color": "black"
                }
            });
        });

        map.current?.on('click', (event) => {
            const features = map.current?.queryRenderedFeatures(event.point, {
                layers: ['gdansk-layer']
            });
            if (!features?.length) {
                return;
            }
            const feature = features[0];
            if (feature.properties) {
                setPOI(feature.properties as POIProperties);
            }
            map.current?.flyTo({
                // @ts-ignore coordinates exist in geometry
                center: feature.geometry.coordinates,
                zoom: 16
            }, event)
            setMenuOpen(true);
        });
        return () => {
            console.warn("remove")
            map.current?.remove();
            map.current = null;
        }
    }, []); // eslint is whining here but we do NOT want to reinitialize the map on every prop change trust me

    useEffect(() => {
        if (!zoomLoaded && router.query.zoom) {
            map.current?.setZoom(Number(router.query.zoom))
            setZoomLoaded(true)
        }
    }, [router.query.zoom, zoomLoaded]);

    useEffect(() => {
        if (!centerLoaded && router.query.lng && router.query.lat) {
            map.current?.setCenter({lng: Number(router.query.lng), lat: Number(router.query.lat)})
            setCenterLoaded(true)
        }
    }, [router.query.lng, router.query.lat, centerLoaded])

    const toggleMenu = () => {
        setPOI(null);
        setMenuOpen(!menuOpen);
    }

    // TODO: if logged try to send request
    const save = () => {
        // redirect("/");
    }

    const been = () => {
        // redirect("/");
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
            {POI === null ?
                <>
                    <MenuTitle>Gexplorer</MenuTitle>
                    <MenuLink href="/"><HomeIcon/> <p>Strona Główna</p></MenuLink>
                </> :
                <>
                    <MenuTitle>Gexplorer</MenuTitle>
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
                                <i><FavoriteIcon/></i> <p>Zapisz</p>
                            </POIminiMenuItem>
                            <POIminiMenuItem onClick={been}>
                                <i><BeenhereIcon/></i> <p>Zwiedzone</p>
                            </POIminiMenuItem>
                        </POIminiMenu>
                        <Separator/>
                        <POIdesc>{POI.description}</POIdesc>
                        <Separator/>
                        <POIlist>
                            {POI.address !== null ? <POIlistItem><PlaceIcon/> <p>{POI.address}</p></POIlistItem> : <></>}
                            {POI.website !== null ? <POIlistItem><PublicIcon/> <POIwebsite href={POI.website}>{POI.website}</POIwebsite></POIlistItem> : <></>}
                        </POIlist>
                    </POIinfo>
                </>
            }
        </MenuBox>
        <MapDarkener $open={menuOpen} onClick={toggleMenu}/>
    </div>;
}