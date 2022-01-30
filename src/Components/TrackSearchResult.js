import React from "react";
import styled from "styled-components";

const TrackSearchResult = ({ track, chooseTrack }) => {
  function handlePlay() {
    chooseTrack(track);
  }

  return (
    <ResultContainer onClick={handlePlay}>
      <ResultImage src={track.albumURL} />
      <SongContainer>
        <TitleText>{track.title}</TitleText>
        <ArtistText>{track.artist}</ArtistText>
      </SongContainer>
    </ResultContainer>
  );
};

export default TrackSearchResult;

const ResultContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem;
  cursor: pointer;
`;

const ResultImage = styled.img`
  height: 64px;
  width: 64px;
`;

const SongContainer = styled.div`
  margin-left: 3rem;
`;

const TitleText = styled.p`
  color: #fff;
`;

const ArtistText = styled.p`
  color: #f5f5f5;
`;
