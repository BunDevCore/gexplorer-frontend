import {MultiPolygon, Polygon} from "geojson";

export function makeMultiPolygon(polys: Polygon[]): MultiPolygon {
    return {
        type: "MultiPolygon",
        coordinates: polys.map(x => x.coordinates)
    }
}