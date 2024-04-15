import styled from "styled-components";
import {StandardBox} from "@/styles/universal";

export const ItemTextList = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
  width: 70%;
  align-self: center;
  padding-top: 1rem;
`;

export const ItemText = styled.div<{
    $color?: string,
    $reverse?: boolean
}>`
  position: relative;
  display: flex;
  flex-direction: ${props => props.$reverse ? "row-reverse" : "row"};
  color: ${props => props.$color ?? "black"};
  justify-content: space-between;
  border-radius: 100%;
  padding: 6rem 4rem;
  transition: 250ms;
  font-size: 2rem;

  div {
    text-align: center;
    width: 30%;
    position: relative;

    svg {
      transition: 250ms;
      align-self: center;
      font-size: 4rem;
    }

    &::after {
      content: "";
      position: absolute;
      top: -25%;
      ${props => props.$reverse ? "left: 0;" : "right: 0;"}
      width: .25rem;
      height: 150%;
      background: ${props => props.$color ?? "black"};
    }
  }

  p {
    min-width: 30%;
    max-width: 60%;
    text-align: center;
    align-self: center;
  }

  &:hover {
    &::before {
      filter: opacity(.25);
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: radial-gradient(ellipse, ${props => props.$color ?? "black"}, rgba(0, 0, 0, 0) 75%);
    filter: opacity(.1);
    transition: 500ms;
  }
`;

export const BoxWithImage = styled(StandardBox)`
  position: relative;
  z-index: 2;
  overflow: hidden;
  padding: 12rem 0 0 !important;
  background: none;

  img {
    z-index: -1;
    object-fit: cover;
    border-radius: 0 0 2rem 2rem;
  }
`;

export const HomeGrid = styled.div`
    display: grid;
    gap: 1rem;
    grid-auto-columns: 1fr 1fr;
    grid-auto-rows: 1fr 1fr;
    grid-template-areas:
        "a b"
        "c b";

    @media (max-width: 700px) {
        grid-template-areas:
        "a" "c" "b";
    }
`;

export const HomeMapBox = styled.div`
    overflow: hidden;
`;