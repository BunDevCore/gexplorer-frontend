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
  @media (min-width: 600px) {
    grid-template-columns: 20% 67% 13%;
  }
`;
export const AchievementIcon = styled.div`
  background: cyan;
  text-align: center;
`;

export const AchievementText = styled.div`
  padding: 10px;
  float: left;
`;
export const AchievementValue = styled.div`
  //TODO change color according to theme
  background: #666;
  
  padding: 10px;
  text-align: center;

  border-radius: 1rem;
`;