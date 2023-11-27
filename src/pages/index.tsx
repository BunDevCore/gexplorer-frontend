import ProfileComponent from "@/components/ProfileComponent";
import {useGExplorerStore} from "@/state";

export default function Home() {
  const loggedIn = useGExplorerStore(s => s.loggedIn)
  const user = useGExplorerStore(s => s.id)

  if (!loggedIn) return <div>zaloguj sie aby zrobić kongo</div>;

  return <ProfileComponent username={user}></ProfileComponent>;
}
