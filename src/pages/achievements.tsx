// import AchievementBox from "@/components/AchievementBox";
import {MainLayout, CenterLayout} from "@/styles/universal"
import {AchievementItem, AchievementList, AchievementText, AchievementValue} from "@/styles/achievementBox";

export default function Achievements() {
    const achievements = [["AAA", 3, 5], ["BBB", 6, 10], ["GUN", 0, 100]]
    // return <div><center>You have achieved nothing!!!</center></div>;
    return <MainLayout>
        <CenterLayout>
            <AchievementList>
                {achievements.map(achievement => <AchievementItem>
                    <AchievementText>
                        {achievement[0].toString()}
                    </AchievementText>
                    <AchievementValue>
                        {achievement[1]}/{achievement[2]}
                    </AchievementValue>
                </AchievementItem>)}
            </AchievementList>
        </CenterLayout>
    </MainLayout>;
}
