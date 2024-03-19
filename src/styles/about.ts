import styled from "styled-components";

export const ProfileGrid = styled.div`
    display: flex;
    gap: 1rem;
`;

export const ImageBox = styled.div`
    height: 6rem;
    width: 6rem;
    position: relative;
    border-radius: 100%;

    img {
        object-fit: cover;
    }
`;

export const Name = styled.p`
    font-weight: bold;
    font-size: 2rem;
`;

export const Role = styled.p`
    font-size: 1.75rem;
`;

export const AuthorBox = styled.div`
  width: 85%;
  align-self: center;
  align-items: center;
`;