import styled from "styled-components";

export const AchiInsideContent = styled.div`
    display: grid;
    grid-template-columns: 2rem 1fr 14rem;
    grid-template-areas: 
        "a b d"
        "a c d";
    
    p:nth-child(1) {
        grid-area: a;
        width: 1rem;
        align-self: center;
    }
`;