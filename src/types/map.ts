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
    generated: string
    routeShortName: string
    vehicleCode: string
    headsign: string
}

export type GAITVehicle = {
    generated: string
    routeShortName: string
    vehicleCode: string
    headsign: string
    lat: number
    lon: number
}