import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addToFavorite, addToWatchlist, getDetailMovie, getRecommendationMovie } from "../api";
import '../style/detailMovie.css';
import formatRating from "../helpers/formatRating";
import formatRuntime from "../helpers/formatRuntime";
import formatDate from "../helpers/formatDate";

const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
const navigate = useNavigate()
const DetailMovie = () => {
    const { id } = useParams();
    const [detailMovie, setDetailMovie] = useState(null);
    const [recommendationMovie, setRecommendationMovie] = useState([])

    useEffect(() => {
        getDetailMovie(id).then((result) => {
            setDetailMovie(result);
        });
        getRecommendationMovie(id).then((result) => {
            setRecommendationMovie(result)
        })
    }, [id]);

    if (!detailMovie) {
        return <p>Loading...</p>;
    }

    const newTab = (url) => {
        if (url != "") window.open(url);
    };

    const handleAddToFavorite = () => {
        addToFavorite(id);
        console.log("Added to Favorite!");
    };
    const handleAddToWatchlist = () => {
        addToWatchlist(id);
        console.log("Added to Watchlist!");
    };

    const Recommendations = () => {
        return recommendationMovie.map((movie, i) => {
            return (
                <Link className="recommendation-wrapper" to={`/movie/${movie.id}`} key={i}>
                    <img className="Movie-image item" src={`${baseImageUrl}${movie.poster_path}`} alt={movie.title} />
                    <div className="Movie-title font">{movie.title}</div>
                    <div className="Movie-date font">{formatDate(movie.release_date)}</div>
                </Link>
            )
        })
    }

    return (
        <>
            <div className="detail-container">
                <div className="poster-wrapper">
                    <Link onClick={() => newTab(`https://www.imdb.com/title/${detailMovie.imdb_id}`)}>
                        <img className="poster" src={`${baseImageUrl}${detailMovie.poster_path}`} alt="" />
                    </Link>
                </div>
                <div className="content">
                    <div className="header">
                        <Link className="title" onClick={() => newTab(detailMovie.homepage)}>
                            {detailMovie.title}
                        </Link>
                        <p className="release-date">{`Release Date: ${detailMovie.release_date}`}</p>
                    </div>
                    <div className="overview">
                        <h3>Overview</h3>
                        <p>{detailMovie.overview}</p>
                    </div>
                    <div className="additional-info">
                        <h3>Additional Information</h3>
                        <p>{`Vote Average: ${formatRating(detailMovie.vote_average)}`}</p>
                        <p>{`Runtime: ${formatRuntime(detailMovie.runtime)}`}</p>
                    </div>
                    <div className="add-buttons">
                        <button onClick={handleAddToFavorite}>Add to Favorite</button>
                        <button onClick={handleAddToWatchlist}>Add to Watchlist</button>
                    </div>
                </div>
            </div>

            <div className="title-recommendation">Recommendations</div>
            <div className="recommendation-container">
                <Recommendations />
            </div>
        </>
    );
};


export default DetailMovie;
