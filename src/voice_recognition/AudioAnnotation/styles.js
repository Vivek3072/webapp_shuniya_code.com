import styled from "styled-components";

export const WaveformContianer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 95%;
  background: transparent;
`;

export const AudioContainer = styled.div``;

export const Wave = styled.div`
  width: 100%;
  height: 90px;
`;

export const Timeline = styled.div`
  width: 100%;
  height: 10px;
`;

export const PlayButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background: rgb(47 213 86);
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  padding-bottom: 3px;
  &:hover {
    background: rgb(31 199 51);
  }
`;
