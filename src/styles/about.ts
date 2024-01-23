import styled from "styled-components";
import Box from "@mui/material/Box";

export const AboutBox = styled(Box)<{$disableBoxShadow?: boolean}>`

  @media (min-width: 700px) {
    width: 75%;
    margin-left: 12.5%;
  }
  align-self: center;
  border-radius: 1rem;
  background-color: var(--global-secondary-background-color);
  padding: 1rem;
  margin-top: 1rem;
  ${props => props.$disableBoxShadow && !props.$disableBoxShadow ? "" : "box-shadow: 0 .25rem .25rem rgba(0,0,0,50%);"}
  justify-self: center;
  display: flex;
  flex-direction: row;
  gap: 1rem;

  img {
    background: #666;
    width: 10rem;
    aspect-ratio: 1;
    border-radius: 0.5rem;
  }
  
  p:first-child {
    font-weight: bold;
    font-size: 36px;
  }
`;

export const AuthorBox = styled.div`
  width: 85%;
  align-self: center;
  align-items: center;
`;