import styled from "styled-components";

export const Footer = styled.footer`
  position: relative;
  bottom: 0;
  height: var(--footer-height);
  background-color: var(--footer-background-color);
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
    filter: invert(0.25);
    object-fit: contain;
  }
  
  &::after {
    content: "";
    position: absolute;
    top: 1rem;
    right: 0;
    width: .25rem;
    height: 10rem;
    background-color: var(--footer-color);
  }
`;

export const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: .25rem;
  
  a {
    text-decoration: none;
    color: var(--footer-color);
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