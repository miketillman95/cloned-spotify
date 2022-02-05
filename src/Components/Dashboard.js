import React, { useState, useEffect} from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import axios from 'axios'
import TrackSearchResult from '../Components/TrackSearchResult.js'
import useAuth from '../auth/useAuth.js'
import Player from './Player.js'

import {
    DashBoardContainer,
    SearchInput,
    ResultsContainer,
    LyricsContainer,
    PlayerContainer,
} from './styles/Dashboard.styles.js'


const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID
})

const Dashboard = ({code}) => {
    // state for login search, results, playing and seeing lyrics
    const accessToken = useAuth(code)
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState('') 


function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch('')
    setLyrics('')
}

useEffect(() => {
    // if the track isnt playing return the lyrics from the lyrics api endpoint.
    if(!playingTrack) return
    (async () => {
        const {
            data: {lyrics},
        } = await axios.get(`${process.env.REACTT_APP_BASE_URL}/lyrics`, {
            params: {
                track: playingTrack.title,
                artist: playingTrack.artist
            },
        })
        setLyrics(lyrics)
    })()
    // dependency array that is called once a track is playing 
}, [playingTrack])

useEffect(() => {
    if(!accessToken) return
    spotifyApi.setAccessToken(accessToken)
}, [accessToken])

useEffect(() => {
    // if  search isnt resolved return searchresults
    if(!search) return setSearchResults([])
    // if accesstoken isnt present dont return anything 
    if(!accessToken) return

    let cancel = false
    (async () => {
        const { body } = await spotifyApi.searchTracks(search)
        // if there are no search results return nothing, if there are return the results of the result of the setSearchResults
        if(cancel) {return 
        } else{
        setSearchResults(
            body.tracks.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce(
                    (smallest, image) => {
                        if(image.height < smallest.height) return image

                        return smallest
                    },
                    track.album.images[0]
                )
                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url
                }
            })
        )}
    })()

    return () => (cancel = true)
}, [search, accessToken])

return (
<DashBoardContainer>
    <SearchInput
      type = 'search'
      placeholder = 'Look yo song up playa'
      value = {search}
      onChange= {e => setSearch(e.target.value)}      
    />

    <ResultsContainer>
        {searchResults.map(track => (
            <TrackSearchResult
            track= {track}
            key= {track.uri}
            chooseTrack = {chooseTrack}
            />
        ))}
        {searchResults.length === 0 && (
            <LyricsContainer>{lyrics}</LyricsContainer>
        )}
    </ResultsContainer>
    <PlayerContainer>
        <Player accessToken= {accessToken} trackUri={playingTrack?.uri}/>
    </PlayerContainer>
</DashBoardContainer>

)
}

export default Dashboard