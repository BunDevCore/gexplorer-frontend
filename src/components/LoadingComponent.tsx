import {DefaultLayout, StandardBox} from "@/styles/universal";
import useTranslation from "next-translate/useTranslation";

export default function LoadingComponent() {
    const {t} = useTranslation("common");

    return <DefaultLayout>
        <StandardBox>
            {t("loading")}
        </StandardBox>
    </DefaultLayout>
}
