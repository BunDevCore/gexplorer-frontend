import {useGExplorerStore} from "@/state";
import {ChangeEvent, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {MainLayout} from "@/styles/universal";
import {apiUrl} from "@/config";

export default function UploadPage() {
    const loggedIn = useGExplorerStore(s => s.loggedIn)
    const authDone = useGExplorerStore(s => s.initialAuthDone)
    const token = useGExplorerStore(s => s.token)
    const router = useRouter();

    useEffect(() => {
        if (!loggedIn && authDone) {
            // router.push("/login")
            console.log("chujkurwadupa");
            return;
        }
    }, []);
    
    
    const [gpxContent, setGpxContent] = useState<string>("");
    const [filePicked, setFilePicked] = useState<boolean>(false);
    
    function submit() {
        console.log("submit", gpxContent);
        
        if (token === undefined) {
            return;
        }
        
        if (!filePicked) {
            return;
        }
        
        const url = apiUrl("/Trip/new");
        const body = {
            gpxContents: gpxContent
        };
        (async () => {
            let res = await fetch(apiUrl("/Trip/new"), {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    'gpxContents': gpxContent,
                })
            });
        })();
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
    
    return <MainLayout>
        <input type="file" name="gpx" id="gpx" onChange={fileChangeHandler}/>
        <input type="submit" onClick={submit}/>
    </MainLayout>
}