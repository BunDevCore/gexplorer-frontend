import styled from "styled-components";
import Box from '@mui/material/Box';

export const LoginBox = styled(Box)`
  border-radius: 1rem;
  background-color: var(--global-secondary-background-color);
  padding: 1rem;
  margin-top: 6rem;
  margin-bottom: 4rem;
  box-shadow: 0 .25rem .25rem black;
  justify-self: center;
`;

export const LoginDataBox = styled(Box)`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  & input {
    border-radius: 4px 4px 0 0;
  }
`;