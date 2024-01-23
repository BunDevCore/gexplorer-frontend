import styled from "styled-components";
import {StandardBox} from "@/styles/universal";

export const ErrorBox = styled(StandardBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const Code = styled.p`
  font-size: 8rem;
  font-weight: bold;
`;

export const Name = styled.p`
  font-size: 6rem;

`;

export const Desc = styled.p`
  font-size: 3rem;
`;