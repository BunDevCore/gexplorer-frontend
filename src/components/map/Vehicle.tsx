import type {GAITPropertiesVehicle} from "@/types/map";
import {InfoList, InfoSubtitle, InfoTitle, MenuTitle} from "@/styles/map";

export default function SelectedVehicles({Vehicle}: { Vehicle: GAITPropertiesVehicle }) {
    console.log(Vehicle);

    return <>
        <MenuTitle href={"/"}>Gexplorer</MenuTitle>
        <InfoList>
            <InfoTitle>
                {Vehicle.name} {Vehicle.headsign}
                <InfoSubtitle>
                    {Vehicle.code}
                    {/* info about when last updated, decided not to add because you would need to update it constantly */}
                    {/*<InfoRight>{Vehicle.generated}</InfoRight>*/}
                </InfoSubtitle>
            </InfoTitle>
            {/*<ChangingList>*/}

            {/*</ChangingList>*/}
        </InfoList>
    </>
}