import {useGExplorerStore} from "@/state";
import {ChangeEvent, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {MainLayout, StandardBox} from "@/styles/universal";
import {apiUrl} from "@/config";
import {GpxImportError, Trip} from "@/types/types";
import useTranslation from "next-translate/useTranslation";
import {toast} from "react-toastify";

export default function UploadPage() {
    const loggedIn = useGExplorerStore(s => s.loggedIn)
    const authDone = useGExplorerStore(s => s.initialAuthDone)
    const token = useGExplorerStore(s => s.token)
    const {t} = useTranslation("upload")
    const router = useRouter();

    useEffect(() => {
        if (!loggedIn && authDone) {
            router.replace("/login")
            return;
        }
    });


    const [gpxContent, setGpxContent] = useState<string>("");
    const [filePicked, setFilePicked] = useState<boolean>(false);
    const [error, setError] = useState<GpxImportError | null>(null);
    const [success, setSuccess] = useState<Trip[] | null>(null);

    useEffect(() => {
        if (success === null && error === null) return;


        if (success !== null) {
            success.forEach((trip) => {
                let translated = t("successfulImport", {newArea: trip.newArea, area: trip.area})
                toast(translated)
            });
        }
        else if (error !== null) {
            let translated = t("failedImport", {cause: t(error.cause)})
            toast(translated)
        }
    }, [error, success, t]);

    async function submit() {
        console.log("submit", gpxContent);

        if (token === undefined) {
            return;
        }

        if (!filePicked) {
            toast("noFilePicked")
            return;
        }

        toast("importStarted")

        const url = apiUrl("/Trip/new");
        const body = {
            gpxContents: gpxContent
        };


        let res = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            setSuccess(await res.json());
            setError(null);
        } else {
            setSuccess(null)
            setError(await res.json())
        }
    }

    function fileChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        event.target.files?.item(0)?.text().then(text => {
            if (text == undefined) {
                return;
            }

            setGpxContent(text);
            setFilePicked(true);
        });
    }

    return <MainLayout><StandardBox>
        <h1>{t("importTrip")}</h1>
        <p>{t("uploadDescription1")}</p>
        <p><b>{t("attention")}</b> {t("uploadDescription2")}</p>
        <input type="file" name="gpx" id="gpx" onChange={fileChangeHandler}/>
        <input type="submit" onClick={submit}/>
    </StandardBox></MainLayout>
}