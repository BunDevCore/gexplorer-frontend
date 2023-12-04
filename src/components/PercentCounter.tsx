import {AreaCounterContainer, MediumText, SmallText, LargeText, UnitText} from "@/styles/areaCounter";


export default function AreaCounter({percent}: { percent: number }) {

    const areaString = percent.toFixed(5);
    const dotPosition = areaString.indexOf(".");
    const bigText = areaString.substring(0, dotPosition + 4);
    const medText = areaString.substring(dotPosition + 4);

    // return <></>

    return <AreaCounterContainer>
        <LargeText>{bigText}</LargeText><MediumText>{medText}</MediumText>&nbsp;
        <UnitText>%</UnitText>
    </AreaCounterContainer>
}
