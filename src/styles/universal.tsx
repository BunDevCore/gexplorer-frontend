import styled from "styled-components";
import {ReactNode} from "react";

export const MainLayout = ({children}: {children: ReactNode}) => <Layout><CenterLayout>{children}</CenterLayout></Layout>;

export const Layout = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr min(60rem, 100%) 1fr;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr min(40rem, 100%) 1fr;
  }

  @media (max-width: 700px) {
    grid-template-columns: 0 100% 0;
  }
`;

export const CenterLayout = styled.main`
  height: 100%;
  grid-column: 2;
  align-items: center;
  padding-top: 1rem;
`;

export const MainBox = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  align-items: center;
  background-color: var(--global-secondary-background-color);
  box-shadow: 0 .25rem .5rem rgba(0,0,0,50%);
`;

export const LayoutBox = ({children}: {children: ReactNode}) => <MainLayout><MainBox>{children}</MainBox></MainLayout>

// <{$width: string, $height: string}>
// width: ${props => props.$width};
// height: ${props => props.$height};
export const ImageWrapper = styled.div`
  object-fit: contain;
  position: relative;
  width: 100%;
  height: 100%;
  
  img {
    position: relative;
  }
`;

export const FlexSpace = styled.div`
  flex-grow: 1;
`;