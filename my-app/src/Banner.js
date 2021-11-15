import React, { useEffect, useState } from 'react';
import './Banner.css';
import requests from './Requests';
import axios from './axios';
function Banner() {
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get((requests.fetchNetflixOriginals));
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length)
            ]);
            return request;
        }
        fetchData();
    }, [])
    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0,n-1 ) + "..." : string
    }
    return (
        <header className="banner" style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center'
        }}>
        <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name ||movie?.original_name}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__description">
                    {truncate(movie?.overview,150)}
                </h1>
        </div>
            <div className="banner__fadeBottom"/>
        </header>
    )
}

export default Banner
