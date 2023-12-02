import { useEffect, useState } from "react";
import { getFavoriteMovies, removeFromFavorite } from "../api";
import { Link } from "react-router-dom";
import formatDate from "../helpers/formatDate";
import formatRating from "../helpers/formatRating";
import '../style/favorite.css';

const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

export default function Favorite() {
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        getFavoriteMovies().then((result) => {
            setFavoriteMovies(result);
        });
    }, []);

    const handleRemoveFromFavorite = async (movieId) => {
        try {
            await removeFromFavorite(movieId);
            const updatedFavorites = await getFavoriteMovies();
            setFavoriteMovies(updatedFavorites);
        } catch (error) {
            console.error("Error removing from Favorites:", error);
        }
    };

    const Favorites = () => {
        if (favoriteMovies.length === 0) {
            return <div className="error-message">Oops! no favorite movies available at the moment</div>;
        }
        return favoriteMovies?.map((movie, i) => {
            return (
                <div className="Movie-wrapper" key={i}>
                    <Link to={`/movie/${movie.id}`}>
                        <div className="Movie-title">{movie.title}</div>
                        <img className="Movie-image" src={`${baseImageUrl}${movie.poster_path}`} alt={movie.title} />
                        <div className="Movie-date">{formatDate(movie.release_date)}</div>
                        <div className="Movie-rate">{formatRating(movie.vote_average)}</div>
                    </Link>
                    <button onClick={() => handleRemoveFromFavorite(movie.id)}>
                        Remove
                    </button>
                </div>
            );
        });
    };

    return (
        <>
            <h2>Your Favorite Movies</h2>
            <div className="favorite-container">
                <Favorites />
            </div>
        </>
    );
}
