import {create} from 'zustand'
import * as jose from 'jose'

export interface State {
    token: string | undefined,
    loggedIn: boolean,
    id: string,
    districts: any,

    setToken: (value: string) => void
    setLoggedIn: (value: boolean) => void
    setDistricts: (value: any) => void
}

export const useGExplorerStore = create<State>(
    (set) => ({
        token: undefined,
        loggedIn: false,
        id: "",
        districts: {},
        setToken: (value) => set((state) => ({token: value, id: jose.decodeJwt(value).sub})),
        setLoggedIn: (value) => set((state) => ({loggedIn: value})),
        setDistricts: (value) => set((state) => ({districts: value}))
    }),
)