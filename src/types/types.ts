import {Geometry} from "geojson";

export type FullUser = {
    id: string,
    username: string,
    overallAreaAmount: number,
    joinedAt: string,
    trips: DetailedTrip[],
    tripAmount: number,
    districtAreas: DistrictAreas,
    achievements: AchievementGet[]
}

export type AchievementGet = {
    user: ShortUser,
    achievementId: string,
    timeAchieved: string,
    achievedOnTripId: string
}

export type DistrictAreas = {
    [key: string]: number
}

export type DetailedTrip = {
    id: string,
    user: ShortUser,
    area: number,
    length: number,
    gpsPolygon: Geometry
    newArea: number,
    newAchievements: AchievementGet[],
    startTime: string,
    endTime: string,
    uploadTime: string,
    starred: boolean,
}

export type Trip = {
    id: string,
    user: ShortUser,
    area: number,
    length: number,
    newArea: number,
    startTime: string,
    endTime: string,
    uploadTime: string,
    starred: boolean,
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

export type GpxImportErrorKind = "SyntaxError" | "TimeRequired"

export type GpxImportError = {
    cause: GpxImportErrorKind
}