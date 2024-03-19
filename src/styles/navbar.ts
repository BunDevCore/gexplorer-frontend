import styled from "styled-components";
import Link from "next/link";

export const Nav = styled.nav`
    top: 0;
    background-color: var(--primary);
    min-height: var(--navbar-height);
    padding: 1rem;
    position: sticky;
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    z-index: 999;
    margin-bottom: 5rem;

    &:after {
        content: "";
        position: absolute;
        top: 100%;
        width: 0;
        height: 0;
        border-left: 49vw solid transparent;
        border-right: 49vw solid transparent;

        border-top: calc(var(--navbar-height)/2) solid var(--primary);
    }
`;

export const GexplorerLink = styled(Link)`
    color: var(--accent);
    padding: 0 1rem;
    font-size: 2rem;
    font-weight: bold;
    position: relative;
    text-decoration: none;
`;

export const GexplorerIcon = styled.div`
    height: 6rem;
    width: 6rem;
    position: fixed;
    left: 50%;
    top: 3rem;
    transform: translateX(-50%);
    z-index: 999999;

    img {
        object-fit: cover;
    }
`;

export const NavLink = styled(Link)`
    padding: .5rem 1rem;
    border-radius: 1000rem;
    border: 2px solid var(--secondary);
    background-color: var(--primary);
    text-decoration: none;
    color: var(--secondaryText);
    font-size: 1.125rem;
    transition: 50ms;
    
    &:hover {
        filter: brightness(75%);
    }
    
    @media (max-width: 700px) {
        display: none;
    }
`;

export const DropdownButton = styled.button`
    
    @media (min-width: 700px) {
        display: none;
    }
`;