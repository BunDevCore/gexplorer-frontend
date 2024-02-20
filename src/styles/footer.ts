import styled from "styled-components";

export const Footer = styled.div`
    align-self: end;
    width: 100%;
    height: var(--footer-height);
    background-color: var(--primary);
    display: grid;
    grid-template-columns: 1fr min(60rem, 100%) 1fr;
        
    
    @media (max-width: 1000px) {
        grid-template-columns: 1fr min(40rem, 100%) 1fr;
    }

    @media (max-width: 700px) {
        grid-template-columns: 0 100% 0;
    }
`;

export const FooterContent = styled.div`
    grid-column: 2;
    align-self: center;
    display: flex;
    flex-direction: row;
    gap: 6rem;
`;

export const ImageIcon = styled.div`
    width: calc(var(--footer-height) - 2rem);
    height: calc(var(--footer-height) - 2rem);
    position: relative;

    img {
        filter: brightness(0.75);
        object-fit: contain;
    }

    &::after {
        content: "";
        position: absolute;
        top: 1rem;
        right: -1rem;
        width: .25rem;
        height: 10rem;
        background-color: #808080;
        filter: brightness(.75);
    }
`;

export const LinkList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: .25rem;

    a {
        text-decoration: none;
        color: var(--primaryText);
        padding: .25rem;

        &:hover {
            text-decoration: underline;
            color: blue;

            &:visited {
                color: purple;
            }
        }
    }
`;