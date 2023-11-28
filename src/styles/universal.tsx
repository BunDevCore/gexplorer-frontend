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
`;

export const MainBox = styled.main`
  height: 100%;
  grid-column: 2;
  align-items: center;
  background-color: var(--global-box-background-color);
  z-index: 1;
  box-shadow: 0 0 .5rem rgba(0,0,0,50%);
  margin-bottom: 2rem;
`;

export const FlexSpace = styled.div`
  flex-grow: 1;
`;