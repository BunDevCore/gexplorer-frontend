import {AreaCounterContainer, MediumText, SmallText, LargeText, UnitText} from "@/styles/areaCounter";

const km2 = 1_000_000;
const minAreaForKm2 = 10000;

function getInnerForLargeArea(area: number) {
    const areaInKm2 = area / km2;
    const areaString = areaInKm2.toFixed(6);
    const dotPosition = areaString.indexOf(".");
    const bigText = areaString.substring(0, dotPosition + 4);
    const medText = areaString.substring(dotPosition + 4);

    return <><LargeText>{bigText}</LargeText><MediumText>{medText}</MediumText></>
}

export default function AreaCounter({area}: { area: number }) {

    const inner = area < minAreaForKm2 ? <SmallText>{area.toFixed(0)}&nbsp;</SmallText> :
        getInnerForLargeArea(area);
    const unit = area < minAreaForKm2 ? <UnitText>m<sup>2</sup></UnitText> : <UnitText>km<sup>2</sup></UnitText>

    return <AreaCounterContainer>{inner}&nbsp;{unit}</AreaCounterContainer>
}