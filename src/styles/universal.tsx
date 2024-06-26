import styled from "styled-components";
import {ReactNode} from "react";
import Box from "@mui/material/Box";
import {Property} from "csstype";

export const MainLayout = ({children}: {children: ReactNode | null}) => <Layout><CenterLayout>{children}</CenterLayout></Layout>;

export const Layout = styled.div`
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

export const StandardBox = styled(Box)<{$disableBoxShadow?: boolean}>`
  border-radius: 1rem;
  background-color: var(--primary);
  padding: 1rem;
  ${props => props.$disableBoxShadow && !props.$disableBoxShadow ? "" : "box-shadow: 0 .25rem .25rem rgba(0,0,0,50%);"}
  justify-self: center;
  color: var(--primaryText);
  
  @media (max-width: 700px) {
    border-radius: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
`;

export const DefaultLayout = ({children}: {children: ReactNode | null}) => <MainLayout><Wrapper>{children}</Wrapper></MainLayout>;

export const Space = ({space}: { space:Property.Padding }) => <div style={{padding: space}} />;

export const Separator = styled.div`
  border-top: 1px solid #8a8a8a;
`;