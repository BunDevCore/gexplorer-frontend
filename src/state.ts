import {create} from 'zustand'
import * as jose from 'jose'
import {District} from "@/types/types";

export interface State {
    token: string | undefined,
    loggedIn: boolean,
    initialAuthDone: boolean,
    id: string,
    districts: District[],

    setToken: (value: string) => void
    setLoggedIn: (value: boolean) => void
    setDistricts: (value: District[]) => void
}

export const useGExplorerStore = create<State>(
    (set) => ({
        token: undefined,
        loggedIn: false,
        initialAuthDone: false,
        id: "",
        districts: [],
        setToken: (value) => set((state) => ({token: value, id: jose.decodeJwt(value).sub})),
        setLoggedIn: (value) => set((state) => ({loggedIn: value, initialAuthDone: true})),
        setDistricts: (value) => set((state) => ({districts: value}))
    }),
)