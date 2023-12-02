import { useEffect, useState } from "react";
import { getWatchlistMovies, removeFromWatchlist } from "../api";
import { Link } from "react-router-dom";
import formatDate from "../helpers/formatDate";
import formatRating from "../helpers/formatRating";
import '../style/watchlist.css'

const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

export default function Watchlist() {
    const [watchlistMovies, setWatchlistMovies] = useState([]);

    useEffect(() => {
        const fetchWatchlistMovies = async () => {
            try {
                const result = await getWatchlistMovies();
                setWatchlistMovies(result);
            } catch (error) {
                console.error("Error fetching watchlist movies:", error);
            }
        };

        fetchWatchlistMovies();
    }, []);

    const handleRemoveFromWatchlist = async (movieId) => {
        try {
            await removeFromWatchlist(movieId);
            const updatedWatchlist = await getWatchlistMovies();
            setWatchlistMovies(updatedWatchlist);
        } catch (error) {
            console.error("Error removing from Watchlist:", error);
        }
    };

    const Watchlist = () => {
        if (watchlistMovies.length === 0) {
            return <div className="error-message">Oops! no watchlist available at the moment</div>;
        }
        return watchlistMovies?.map((movie, i) => {
            return (
                <div className="Movie-wrapper" key={i}>
                    <Link to={`/movie/${movie.id}`}>
                        <div className="Movie-title">{movie.title}</div>
                        <img className="Movie-image" src={`${baseImageUrl}${movie.poster_path}`} alt={movie.title} />
                        <div className="Movie-date">{formatDate(movie.release_date)}</div>
                        <div className="Movie-rate">{formatRating(movie.vote_average)}</div>
                    </Link>
                    <button onClick={() => handleRemoveFromWatchlist(movie.id)}>
                        Remove
                    </button>
                </div>
            );
        });
    };

    return (
        <>
            <h2>Your Watchlist</h2>
            <div className="watchlist-container">
                <Watchlist />
            </div>
        </>
    );
}
