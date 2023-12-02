// MovieCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import formatRating from '../helpers/formatRating';
import formatDate from '../helpers/formatDate';

const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ movie, showDate, showRating }) {
    return (
        <Link className="Movie-wrapper" to={`/movie/${movie.id}`}>
            <div className="Movie-title item">{movie.title}</div>
            <img className="Movie-image item" src={`${baseImageUrl}${movie.poster_path}`} alt={movie.title} />
            {showDate && <div className="Movie-date item">{formatDate(movie.release_date)}</div>}
            {showRating && (
                <>
                    <div className="Movie-rate">{formatRating(movie.vote_average)}</div>
                </>
            )}
        </Link>
    );
};
