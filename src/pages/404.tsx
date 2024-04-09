import {MainLayout} from "@/styles/universal";
import useTranslation from "next-translate/useTranslation";
import {ErrorBox, Code, Name, Desc} from "@/styles/e404";

export default function E404() {
    const {t} = useTranslation("common")

    return <MainLayout>
        <ErrorBox>
            <Code>404</Code>
            <Name>{t("e404")}</Name>
            <Desc>{t("eDesc404")}</Desc>
        </ErrorBox>
    </MainLayout>;
}
