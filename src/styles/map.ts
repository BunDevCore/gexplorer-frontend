import styled from "styled-components";
import Link from "next/link";

export const MapBox = styled.div`
    overflow: hidden;
    height: 100vh;
    z-index: -1;
`;

export const LatLonZoom = styled.div`
    position: absolute;
    padding: .25rem;
    bottom: 0;
    left: 0;
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
    
    svg {
        stroke: ${props => props.theme.type === "light" ? "#4f4f4f" : "#f4f4f4"};
    }

    @media (max-width: 1200px) {
        left: ${props => props.$open ? "calc(50vw - 5.5rem)" : "0"};
    }

    @media (max-width: 700px) {
        left: ${props => props.$open ? "calc(100vw - 5.5rem)" : "0"};
    }
`;

export const MenuBox = styled.div<{ $open: boolean }>`
    display: flex;
    flex-direction: column;
    transition: 300ms;
    position: absolute;
    padding: 1.75rem;
    top: 0;
    left: 0;
    background-color: var(--primary);
    width: 25vw;
    height: 100%;
    z-index: 2;
    transform: ${props => props.$open ? "translateX(0)" : "translateX(-100%)"};
    
    @media (max-width: 1200px) {
        width: 50vw;
    }

    @media (max-width: 700px) {
        width: 100vw;
    }
`;

export const MenuTitle = styled.p`
    color: var(--accent);
    font-weight: bold;
    font-size: 2rem;
    padding-bottom: 1rem;
`;

export const MenuLink = styled(Link)`
    display: flex;
    gap: 2rem;
    padding: 1rem;
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
    pointer-events: ${props => props.$open ? "initial" : "none" };
    z-index: 1;
    filter: ${props => props.$open ? "opacity(25%)" : "opacity(0%)" };
    background-color: black;
    transition: 300ms;
    position: absolute;
    text-align: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;