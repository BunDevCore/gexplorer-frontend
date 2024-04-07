import {AreaCounterContainer, MediumText, LargeText, UnitText} from "@/styles/areaCounter";
import {Percent} from "@mui/icons-material";


export default function PercentCounter({percent}: { percent: number }) {

    const areaString = percent.toFixed(5);
    const dotPosition = areaString.indexOf(".");
    const bigText = areaString.substring(0, dotPosition + 3);
    const medText = areaString.substring(dotPosition + 3);

    // return <></>

    return <AreaCounterContainer>
        <LargeText>{bigText}</LargeText><MediumText>{medText}</MediumText>&nbsp;
        <Percent />
    </AreaCounterContainer>
}
