import ProfileComponent from "@/components/home/ProfileComponent";
import HomeComponent from "@/components/home/HomeComponent";
import {useGExplorerStore} from "@/state";

export default function Home() {
  const loggedIn = useGExplorerStore(s => s.loggedIn)
  const user = useGExplorerStore(s => s.id)

  if (!loggedIn) return <HomeComponent/>;

  return <ProfileComponent username={user}/>;
}
