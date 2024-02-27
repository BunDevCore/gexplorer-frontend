import styled from "styled-components";
import { styled as msd } from '@mui/material/styles';
import {ButtonBase} from "@mui/material";

export const MapBox = styled.div`
    overflow: hidden;
    height: 100vh;
    z-index: -1;
`;

export const LatLonZoom = styled.div`
    position: absolute;
    padding: .25rem;
    bottom: 0;
    left: 0;
`;

export const MenuButton = styled.button`
    position: absolute;
    text-align: center;
    margin: 1rem;
    padding: 1.75rem;
    top: 0;
    left: 0;
    bottom: 100%;
    right: 100%;
    background-color: var(--primary);
    border-radius: 100%;
    border: none;
`;