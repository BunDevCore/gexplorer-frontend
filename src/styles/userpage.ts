import styled from "styled-components";
import {Paper} from "@mui/material";

export const UserPaper = styled(Paper)`
  background-color: var(--secondary);
  padding: 1rem;
  margin-top: 1rem;
  justify-self: center;
`;

export const TablePaper = styled(Paper)`
  background-color: var(--primary);
  padding: 1rem;
  margin-top: 1rem;
  justify-self: center;
`;

export const ProfileLayout = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;
    > div {
        width: 100%;
    }
`;

export const TripListItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    background: var(--secondary);
    padding: 1rem;
    border-radius: 1rem;
`;
