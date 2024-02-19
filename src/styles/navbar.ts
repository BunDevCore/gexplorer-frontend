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
    justify-content: space-around;
    z-index: 999;

    &:after {
        content: "";
        position: absolute;
        overflow: hidden;
        top: 100%;
        width: 0;
        height: 0;
        border-left: 50vw solid transparent;
        border-right: 50vw solid transparent;

        border-top: calc(var(--navbar-height)/2) solid var(--primary);
    }
`;

export const Gexplorer = styled.div`
    color: var(--accent);
    font-size: 2rem;
    font-weight: bold;
    
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
`;