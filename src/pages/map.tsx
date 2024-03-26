import {useEffect, useRef, useState} from "react";
import mapboxgl from "mapbox-gl";
import {MapBox, MapDarkener, MenuBox, MenuButton, MenuLink, MenuTitle} from "@/styles/map";
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/router";
import {useDebounceCallback} from "usehooks-ts";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import HomeIcon from '@mui/icons-material/Home';

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
            map.current?.resize();
            let labels = [ 'country-label', 'state-label',
                'settlement-label', 'settlement-subdivision-label',
                'airport-label', 'poi-label', 'water-point-label',
                'water-line-label', 'natural-point-label',
                'natural-line-label', 'waterway-label', 'road-label' ];

            labels.forEach((label => {
                map.current?.setLayoutProperty(label, 'text-field', [
                    'get',
                    `name_${lang !== "pl" ? lang : "en"}`
                ]);
            }))
        });
    });

    useEffect(() => {
        if (!zoomLoaded && router.query.zoom) {
            map.current?.setZoom(Number(router.query.zoom))
            setZoomLoaded(true)
        }
    }, [router.query.zoom]);

    useEffect(() => {
        if (!centerLoaded && router.query.lng && router.query.lat) {
            map.current?.setCenter({lng: Number(router.query.lng), lat: Number(router.query.lat)})
            setCenterLoaded(true)
        }
    }, [router.query.lng, router.query.lat])

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const menuIconX = 10;
    const menuIconY = 48/2;
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
                <line x1={menuIconX} y1={menuIconY-menuIconSpacing} x2={48 - menuIconX} y2={menuIconY-menuIconSpacing}
                    style={{
                        ...menuOpen ? {
                            transform: `translate(${menuIconSpacing}px, ${menuIconY-menuIconSpacing}px) rotate(45deg)`
                        } : {} , transition: "inherit", transformOrigin: "top"}}/>
                <line x1={menuIconX} y1={menuIconY} x2={48 - menuIconX} y2={menuIconY}
                      style={{opacity: Number(!menuOpen), transition: "inherit"}}/>
                <line x1={menuIconX} y1={menuIconY+menuIconSpacing} x2={48 - menuIconX} y2={menuIconY+menuIconSpacing}
                      style={{
                          ...menuOpen ? {
                              transform: `translate(${menuIconSpacing}px, -${menuIconY-menuIconSpacing}px) rotate(-45deg)`
                          } : {} , transition: "inherit", transformOrigin: "bottom"}}/>
            </svg>
        </MenuButton>
        <MenuBox $open={menuOpen}>
            <MenuTitle>Gexplorer</MenuTitle>
            <MenuLink href="/"><HomeIcon/> <p>Strona Główna</p></MenuLink>
        </MenuBox>
        <MapDarkener $open={menuOpen} onClick={toggleMenu}/>
    </div>;
}