import {Geometry} from "geojson";

export type FullUser = {
    id: string,
    username: string,
    overallAreaAmount: number,
    joinedAt: string,
    trips: Trip[],
    tripAmount: number,
    districtAreas: DistrictAreas;
}

export type DistrictAreas = {
    [key: string]: number
}

export type Trip = {
    id: string,
    user: ShortUser,
    area: number,
    gpsPolygon: Geometry
}

export type ShortUser = {
    id: string,
    username: string,
    overallAreaAmount: number,
    joinedAt: string,
}

export type District = {
    id: string,
    name: string,
    geometry: Geometry
    area: number
}

export type Leaderboard<V> = {
    [key: number]: LeaderboardEntry<V>
}

export type LeaderboardEntry<V> = {
    user: ShortUser,
    value: V,
}