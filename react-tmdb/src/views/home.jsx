import { useEffect, useState } from 'react';
import '../style/home.css';
import { getMovieList, getNowPlaying, getTopRated, searchMovie } from '../api';
import formatRating from '../helpers/formatRating';
import formatDate from '../helpers/formatDate';
import { Link } from "react-router-dom";

const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

export default function Home() {
    const [nowPlaying, setNowPlaying] = useState([])
    const [topRated, setTopRated] = useState([])
    const [searchValue, setSearchValue] = useState(false)
    const [searchError, setSearchError] = useState('');

    useEffect(() => {
        getNowPlaying().then((result) => {
            setNowPlaying(result)
        })
        getTopRated().then((result) => {
            setTopRated(result)
        })
    }, []);

    const NowPlayingMovieList = () => {
        return nowPlaying.map((movie, i) => {
            return (
                <Link className="Now-playing-wrapper" to={`/movie/${movie.id}`} key={i}>
                    <img className="Movie-image item" src={`${baseImageUrl}${movie.poster_path}`} alt={movie.title} />
                    <div className="Movie-title item">{movie.title}</div>
                    <div className="Movie-date item">{formatDate(movie.release_date)}</div>
                </Link>
            )
        })
    }

    const TopRatedMovieList = () => {
        if (topRated.length === 0 && searchError) {
            return <div className="error-message">{searchError}</div>;
        }
        return topRated.map((movie, i) => {
            return (
                <Link className="Movie-wrapper" to={`/movie/${movie.id}`} key={i}>
                    <div className="Movie-title">{movie.title}</div>
                    <img className="Movie-image" src={`${baseImageUrl}${movie.poster_path}`} alt={movie.title} />
                    <div className="Movie-date">{formatDate(movie.release_date)}</div>
                    <div className="Movie-rate">{formatRating(movie.vote_average)}</div>
                </Link>
            )
        })
    }

    const search = async (q) => {
        if (q.length > 3) {
            setSearchValue(true)
            try {
                const query = await searchMovie(q);
                if (query.results.length > 0) {
                    setTopRated(query.results);
                    setSearchError('');
                } else {
                    setTopRated([]);
                    setSearchError('Oops! The movie you are looking for is not available in our database');
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setTopRated([]);
            setSearchError('');
        }
    };

    return (
        <>
            <div className='Title-show'>Now Playing</div>
            <div className='Now-playing-container'>
                <NowPlayingMovieList />
            </div>
            <input
                placeholder='Search...'
                className='Movie-search'
                onChange={({ target }) => search(target.value)}
            />
            {searchValue ? "" : (
                <>
                    <div className='Title-show'>Top Rated</div>
                </>
            )}
            <div className="Movie-container">
                <TopRatedMovieList />
            </div>
        </>
    );
}
