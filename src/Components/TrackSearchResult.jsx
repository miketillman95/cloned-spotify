import React from 'react'

import {
    ResultContainer,
    Resultimage,
    SongContainer,
    TitlesText,
    ArtistText,
} from '../styles/TrackSearchResults.styles.jsx'

const TrackSearchResult =({ track, chooseTrack}) => {
    function handlePlay() {
        chooseTrack(track)

    }

    return(
       < ResultContainer onClick = {handlePlay}>
           <ResultImage src ={track.albumURL} />
           <SongContainer>
               <TitleText>{track.title}</TitleText>
               <ArtistText>{track.artist}</ArtistText>
           </SongContainer>
       </ResultContainer>
    )  
}

export default TrackSearchResult


