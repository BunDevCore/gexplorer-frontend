import styled from "styled-components";
import Link from "next/link";

export const MapBox = styled.div`
    overflow: hidden;
    height: 100vh;
`;

export const MenuButton = styled.button<{ $open: boolean }>`
    cursor: pointer;
    transition: 300ms;
    position: absolute;
    text-align: center;
    margin: 1rem;
    padding: 1.75rem;
    top: 0;
    left: ${props => props.$open ? "calc(25vw - 5.5rem)" : "0"};
    bottom: 100%;
    right: 100%;
    background-color: var(--primary);
    border-radius: 100%;
    border: none;
    z-index: 3;
    width: 2rem;
    height: 2rem;

    svg {
        stroke: ${props => props.theme.type === "light" ? "#4f4f4f" : "#f4f4f4"};
    }

    @media (max-width: 1400px) {
        left: ${props => props.$open ? "calc(50vw - 5.5rem)" : "0"};
    }

    @media (max-width: 700px) {
        left: ${props => props.$open ? "calc(100vw - 5.5rem)" : "0"};
    }
`;

export const BackButton = styled.button<{ $open: boolean, $dataDisplayed: boolean }>`
    cursor: pointer;
    transition: 300ms;
    position: absolute;
    text-align: center;
    margin: 1rem;
    padding: 1.75rem;
    top: 0;
    left: ${props => props.$open ? props.$dataDisplayed ? "calc(25vw - 10.5rem)" : "calc(25vw - 5.5rem)" : "0"};
    bottom: 100%;
    right: 100%;
    background-color: var(--primary);
    border-radius: 100%;
    border: none;
    z-index: 3;
    width: 2rem;
    height: 2rem;

    svg {
        stroke: ${props => props.theme.type === "light" ? "#4f4f4f" : "#f4f4f4"};
    }

    @media (max-width: 1400px) {
        left: ${props => props.$open ? props.$dataDisplayed ? "calc(50vw - 10.5rem)" : "calc(50vw - 5.5rem)" : "0"};
    }

    @media (max-width: 700px) {
        left: ${props => props.$open ? props.$dataDisplayed ? "calc(100vw - 10.5rem)" : "calc(100vw - 5.5rem)" : "0"};
    }
`;

export const MenuBox = styled.div<{ $open: boolean }>`
    //overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: 300ms;
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--primary);
    width: 25vw;
    height: 100%;
    z-index: 2;
    transform: ${props => props.$open ? "translateX(0)" : "translateX(-100%)"};

    @media (max-width: 1400px) {
        width: 50vw;
    }

    @media (max-width: 700px) {
        width: 100vw;
    }
`;

export const MenuTitle = styled(Link)`
    color: var(--accent);
    font-weight: bold;
    font-size: 2rem;
    padding: 1.75rem 1.75rem 1rem;
    text-decoration: none;
`;

export const MenuLink = styled(Link)`
    padding: 1rem 2.75rem;
    display: flex;
    gap: 2rem;
    text-decoration: none;
    color: var(--primaryText);
    transition: 100ms;

    > svg {
        font-size: 2rem;
    }

    > p {
        align-self: center;
    }

    :hover {
        color: var(--accent)
    }
`;

export const MenuItem = styled.div`
    padding: 1rem 2.75rem;
    display: flex;
    gap: 2rem;
    text-decoration: none;
    color: var(--primaryText);
    transition: 100ms;

    > svg {
        font-size: 2rem;
    }

    > p {
        align-self: center;
    }

    :hover {
        color: var(--accent)
    }
`;

export const MapDarkener = styled.div<{ $open: boolean }>`
    pointer-events: ${props => props.$open ? "initial" : "none"};
    z-index: 1;
    filter: ${props => props.$open ? "opacity(25%)" : "opacity(0%)"};
    background-color: black;
    transition: 300ms;
    position: absolute;
    text-align: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const InfoList = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
`;

export const POIimage = styled.div`
    height: 15rem;
    position: relative;

    img {
        object-fit: cover;
    }
`;

export const InfoTitle = styled.div`
    padding: 1rem 2rem;
    font-weight: bold;
    font-size: 2rem;
    color: var(--primaryText);
    backdrop-filter: brightness(${props => props.theme.type === "dark" ? "120%" : "105%"});
`;

export const InfoSubtitle = styled.p`
    font-size: .9rem;
    font-weight: normal;
    color: var(--primaryText);
`;

export const POIminiMenu = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 1rem;
`;

export const POIminiMenuItem = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--accent);
    border-color: var(--accent);
    gap: .25rem;

    > p {
        font-size: .9rem;
    }

    > i {
        font-size: .5rem;
        padding: .5rem;
        border-radius: 100%;
        border: 2px solid;

        > svg {
            padding-top: 2px;
        }
    }

    :hover {
        color: var(--secondary-accent);
        border-color: var(--secondary-accent);
    }
`;

export const POIdesc = styled.div`
    padding: 1rem 2rem;
    color: var(--primaryText);
`;

export const POIlist = styled.div`
    display: flex;
    color: var(--primaryText);
    padding: 1rem 2rem;
    flex-direction: column;
    gap: 1rem;
`;

export const POIlistItem = styled.div`
    display: flex;
    gap: 1rem;

    > p {
        align-self: center;
    }
`;

export const POIwebsite = styled.a`
    color: var(--primaryText);
    text-decoration: none;

    :hover {
        text-decoration: underline;
    }
`;

export const DeparturesList = styled.div`
    display: flex;
    color: var(--primaryText);
    flex-direction: column;
    overflow-y: auto;
    height: calc(100vh - 186px);

    > div:nth-child(2n) {
        backdrop-filter: brightness(75%);
    }
`;

export const DeparturesListItem = styled.div`
    padding: 1rem 2rem;
    display: grid;
    grid-template-columns: 2rem 1fr 6rem;
    gap: 1rem;
`;