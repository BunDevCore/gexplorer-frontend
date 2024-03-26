import styled from "styled-components";

export const ProfileGrid = styled.div`
    display: flex;
    gap: 2rem;
    border-radius: 1000rem;
`;

export const ImageBox = styled.div`
    height: 9rem;
    width: 9rem;
    position: relative;
    margin: -1rem;

    img {
        object-fit: cover;
        border-radius: 1rem 0 0 1rem;
    }
`;

export const Name = styled.p`
    font-weight: bold;
    font-size: 2rem;
    padding-top: .25rem;
`;

export const Role = styled.p`
    font-size: 1.75rem;
    padding-left: 1rem;
`;

export const LinkList = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding-left: 1rem;
    
    a {
        text-decoration: none;
        
        :hover {
            text-decoration: underline;
        }
    }
`;