import styled from "styled-components";

export const AchievementList = styled.div`
    
`;
export const AchievementItem = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 5px;

  background: #a4a4a4;
  border-radius: 1rem;

  display: grid;
  grid-template: 
            "a b" auto
            "a c" auto;
  
  grid-template-columns: 20% 80%;
  @media (min-width: 600px) {
    grid-template: "a b c";
    grid-template-columns: 20% 67% 13%;
  }
`;
export const AchievementIcon = styled.div`
  background: cyan;
  text-align: center;
  grid-area: a;
  aspect-ratio: 1;
  height: 64px;
  margin: 0 auto;
`;

export const AchievementText = styled.div`
  padding: 10px;
  float: left;
  grid-area: b;
`;
export const AchievementValue = styled.div`
  //TODO change color according to theme
  background: #666;

  grid-area: c;
  padding: 10px;
  text-align: center;

  border-radius: 1rem;
`;