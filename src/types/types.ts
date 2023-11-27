import {GeoJSON} from "geojson";

export type FullUser = {
    id: string,
    username: string,
    overallAreaAmount: number,
    joinedAt: string,
    trips: Trip[],
    tripAmount: number,
    districtAreas: {
        [key: string]: number
    }
}

export type Trip = {
    id: string,
    user: ShortUser,
    area: number,
    gpsPolygon: GeoJSON.Polygon
}

export type ShortUser = {
    id: string,
    username: string,
    overallAreaAmount: number,
    joinedAt: string,
}

export type Leaderboard<V> = {
    [key: number]: LeaderboardEntry<V>
}

export type LeaderboardEntry<V> = {
    user: ShortUser,
    value: V,
}