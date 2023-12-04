import {create} from 'zustand'
import * as jose from 'jose'
import {District, DistrictAreas} from "@/types/types";

export interface State {
    token: string | undefined,
    loggedIn: boolean,
    initialAuthDone: boolean,
    id: string,
    districts: {[key: string]: District},
    districtsLoading: boolean,

    setToken: (value: string) => void
    setLoggedIn: (value: boolean) => void
    setDistricts: (value: District[]) => void
    setDistrictsLoading: (value: boolean) => void
}

export const useGExplorerStore = create<State>(
    (set) => ({
        districtsLoading: false,
        token: undefined,
        loggedIn: false,
        initialAuthDone: false,
        id: "",
        districts: {},
        setToken: (value) => set((state) => ({token: value, id: jose.decodeJwt(value).sub})),
        setLoggedIn: (value) => set((state) => ({loggedIn: value, initialAuthDone: true})),
        setDistricts: (value) => set((state) => ({districts: Object.fromEntries(value.map(d =>
            [d.id, d]))})),
        setDistrictsLoading: (value) => set((state) => ({districtsLoading: value}))
    }),
)