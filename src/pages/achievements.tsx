// import AchievementBox from "@/components/AchievementBox";
import {MainLayout, CenterLayout} from "@/styles/universal"
import {AchievementList, AchievementItem, AchievementIcon, AchievementText, AchievementValue} from "@/styles/achievementBox";

export default function Achievements() {
    const achievements = [["SVG", "AAA", 3, 5], ["IMG", "BBB", 6, 10], ["IDK", "GUN", 0, 100],
        ["gd_booklink", "Odwiedź każdą bibliotekę w Gdańsku", 3, 43], ["gd_old_city", "Zwiedź całe śródmieście", 45, 1234],
        ["gd_train_station", "Dostań się na każdą stację kolejową", 2, 13], ["gd_shop", "Spotkajmy się w Centrum Handlowym", 1, 14]]

    return <MainLayout>
        <CenterLayout>
            <AchievementList>
                {achievements.map(achievement => <AchievementItem>
                    <AchievementIcon>
                        {/*TODO image or svg here as an icon for achievement*/}
                        {achievement[0].toString()}
                    </AchievementIcon>
                    <AchievementText>
                        {achievement[1].toString()}
                    </AchievementText>
                    <AchievementValue>
                        {achievement[2]}/{achievement[3]}
                    </AchievementValue>
                </AchievementItem>)}
            </AchievementList>
        </CenterLayout>
    </MainLayout>;
}
