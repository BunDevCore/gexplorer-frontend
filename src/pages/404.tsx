import {MainLayout} from "@/styles/universal";
import useTranslation from "next-translate/useTranslation";

export default function E404() {
    const {t} = useTranslation("common")

    return <MainLayout>
        <p>{t("e404")}</p>
    </MainLayout>;
}
