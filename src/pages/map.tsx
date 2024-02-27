import {useEffect, useRef, useState} from "react";
import mapboxgl from "mapbox-gl";
import {LatLonZoom, MapBox, MenuButton} from "@/styles/map";
import {usePathname, useSearchParams} from "next/navigation";
import {useRouter} from "next/router";

export default function MapPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<null | mapboxgl.Map>(null);
    const [lng, setLng] = useState(18.63);
    const [lat, setLat] = useState(54.35);
    const [zoom, setZoom] = useState(11);
    const mapParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const params = new URLSearchParams(mapParams.toString());

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
            params.set("lng", String(map.current?.getCenter().lng));
            params.set("lat", String(map.current?.getCenter().lat));
            params.set("zoom", String(map.current?.getZoom()));
            router.push(pathname + '?' + params)
            setLng(map.current?.getCenter().lng!);
            setLat(map.current?.getCenter().lat!);
            setZoom(map.current?.getZoom()!);
        });

        // TODO: get lan lng zoom from query params
        map.current.on('load', () => {
            map.current?.resize();
        });
    });

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

        <LatLonZoom>lat {lat} lon {lng} zoom {zoom}</LatLonZoom>
    </div>;
}