import styled from "styled-components";
import Box from '@mui/material/Box';


export const LoginDataBox = styled(Box)`
    gap: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    > * {
        width: 90%;
    }

    > button {
        width: 50%
    }
`;