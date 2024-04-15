import {DefaultLayout, StandardBox} from "@/styles/universal";
import {useGExplorerStore} from "@/state";
import useSWR from "swr";
import fetcher from "@/fetcher";
import {AccountInfoLayout, ImageBox, AccountName, AccountButtons} from "@/styles/account";
import Image from "next/image";
import { Button } from "@mui/material";
import useTranslation from "next-translate/useTranslation";

type User = {
    id: string
    username: string
    overallAreaAmount: number
    joinedAt: string
    trips: any[]
    tripAmount: number
    totalTripLength: number
    districtAreas: any[]
    achievements: any[]
}

export default function AccountComponent() {
    const {t} = useTranslation("common");
    const id = useGExplorerStore(s => s.id)
    const userSWR = useSWR<User>(`/User/id/${id}`, fetcher);

    return <DefaultLayout>
        <StandardBox>
            <AccountInfoLayout>
                <ImageBox>
                    <Image src={"/blackIcon.svg"} alt={"profile picture"} fill={true}/>
                </ImageBox>
                <AccountName>{userSWR.data?.username}</AccountName>
            </AccountInfoLayout>
            <AccountButtons>
                <Button variant="outlined">{t("changePfp")}</Button>
                <Button variant="outlined">{t("changeUser")}</Button>
                <Button variant="outlined">{t("changePass")}</Button>
                <Button variant="contained" onClick={() => window.location.replace("/logout")}>{t("logout")}</Button>
            </AccountButtons>
        </StandardBox>
    </DefaultLayout>;
}