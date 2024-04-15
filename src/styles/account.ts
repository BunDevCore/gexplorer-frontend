import styled from "styled-components";


export const ImageBox = styled.div`
    height: 9rem;
    width: 9rem;
    position: relative;
    background: gray;
    border-radius: 100%;

    img {
        object-fit: cover;
        border-radius: 1rem 0 0 1rem;
    }
`;

export const AccountName = styled.p`
    font-size: 4rem
`;

export const AccountInfoLayout = styled.div`
    display: flex;
    flex-direction: row;
    padding: 2rem 2rem;
    gap: 1rem;
    align-content: center;
    align-items: center;
`;

export const AccountButtons = styled.div`
    display: flex;
    flex-direction: row;
    padding: 2rem 2rem;
    gap: 1rem;
`;