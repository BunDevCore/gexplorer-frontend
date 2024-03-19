import {useEffect, useRef, useState} from "react";
import mapboxgl from "mapbox-gl";
import {MapBox, MenuButton} from "@/styles/map";
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/router";
import {useDebounceCallback} from "usehooks-ts";
import useTranslation from "next-translate/useTranslation";

export default function MapPage() {
    const {lang} = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<null | mapboxgl.Map>(null);
    const mapParams = useSearchParams();
    const router = useRouter();
    const params = new URLSearchParams(mapParams.toString());
    const replaceRouter = useDebounceCallback(router.replace, 250);

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

        return () => {
            map.current?.off("move");
            map.current?.off("load");
        }
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
            <MapBox ref={mapContainer} />
        <MenuButton onClick={toggleMenu}>
            <svg
                width="48"
                height="48"
                style={{
                    stroke: "#4f4f4f",
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

        {/*<LatLonZoom>lat {lat} lon {lng} zoom {zoom}</LatLonZoom>*/}
    </div>;
}