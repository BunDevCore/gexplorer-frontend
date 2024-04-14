export type POIProperties = {
    type: string
    id: string
    title: string
    category: string
    description: string
    image: string
    address: string | null
    phone: string | null
    website: string | null
}

export type GAITPropertiesStop = {
    id: number
    code: string
    name: string
    desc: string
    onDemand: boolean
    ticketZoneBorder: boolean
}

export type GAITStop = {
    stopId: number
    stopCode: string
    stopName: string
    stopDesc: string
    subName: number
    stopLat: number
    stopLon: number
    virtual: 1 | 0 | null
    nonpassenger: 1 | 0 | null
    depot: 1 | 0 | null
    onDemand: 1 | 0 | null
    ticketZoneBorder: 1 | 0 | null
}

export type GAITStopDepartures = {
    id: string
    delayInSeconds: number
    headsign: string
    routeShortName: string
    estimatedTime: string
}

export type GAITPropertiesVehicle = {
    routeId: number
    tripId: number
    generated: string
    name: string
    routeShortName: string
    code: string
    headsign: string
}

export type GAITVehicle = {
    routeId: number
    tripId: number
    vehicleService: string
    generated: string
    routeShortName: string
    vehicleCode: string
    headsign: string
    direction: number
    lat: number
    lon: number
}

export type GAITRoutes = {
    routeId: number,
    agencyId: number,
    routeShortName: string
    routeLongName: string
    activationDate: string
    routeType: "BUS" | "TRAM" | "FERRY" | "UNKNOWN"
}

export type GAITStopTimes = {
    stopId: number
    tripId: number
    arrivalTime: string
    stopShortName: string
    virtual: 1 | 0 | null
    nonpassenger: 1 | 0 | null
    depot: 1 | 0 | null
    onDemand: 1 | 0 | null
    ticketZoneBorder: 1 | 0 | null
}