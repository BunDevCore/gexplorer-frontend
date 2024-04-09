import LoginComponent from "@/components/account/LoginComponent";
import AccountComponent from "@/components/account/AccountComponent";
import {useGExplorerStore} from "@/state";

export default function Home() {
    const loggedIn = useGExplorerStore(s => s.loggedIn)
    if (!loggedIn) return <LoginComponent/>;

    return <AccountComponent/>;
}
