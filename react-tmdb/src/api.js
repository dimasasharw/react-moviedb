import axios from 'axios'
import { options } from './options';

const baseUrl = 'https://api.themoviedb.org/3'
const apiKey = 'b7002357efd051872e566d18e72e80ac'
const account_id = localStorage.getItem("accountId")

export const getMovieList = async () => {
    try {
        const movie = await axios(`${baseUrl}/movie/popular?`, options)
        // console.log({ movieList: movie });
        return movie.data.results
    } catch (error) {
        console.log(error);
    }
}

export const getNowPlaying = async () => {
    try {
        const movie = await axios(`${baseUrl}/movie/now_playing?`, options)
        // console.log({ nowPlaying: movie });
        return movie.data.results
    } catch (error) {
        console.log(error);
    }
}

export const getTopRated = async () => {
    try {
        const movie = await axios(`${baseUrl}/movie/top_rated`, options)
        // console.log({ topRated: movie });
        return movie.data.results
    } catch (error) {
        console.log(error);
    }
}

export const searchMovie = async (q) => {
    try {
        const search = await axios(`${baseUrl}/search/movie?query=${q}?`, options)
        // console.log({ movieSearch: search.data });
        return search.data
    } catch (error) {
        console.log(error);
    }
}

export const getDetailMovie = async (id) => {
    try {
        const movie = await axios(`${baseUrl}/movie/${id}`, options)
        console.log({ movie: movie });
        return movie.data
    } catch (error) {
        console.log(error);
    }
}

export const getRecommendationMovie = async (id) => {
    try {
        const movie = await axios(`${baseUrl}/movie/${id}/recommendations`, options)
        // console.log({recommendations: movie});
        return movie.data.results
    } catch (error) {
        console.log(error);
    }
}

export const getRequestToken = async () => {
    try {
        const requestToken = await axios(`${baseUrl}/authentication/token/new`, options)
        // console.log('>>>>>>>>>>>>>>>>>>',requestToken.data.request_token);
        return requestToken.data.request_token
    } catch (error) {
        console.log(error);
    }
}

export const getSessionId = async (token) => {
    try {
        const sessionId = await axios(`${baseUrl}/authentication/session/new?request_token=${token}`, options)
        console.log('session id>>>>>>', sessionId.data.session_id);
        return sessionId.data.session_id
    } catch (error) {
        console.log(error);
    }
}

export const getAccountDetails = async (sessionId) => {
    try {
        const response = await axios.get(
            'https://api.themoviedb.org/3/account',
            {
                params: { api_key: apiKey, session_id: sessionId },
            }
        );
        console.log({ dataAkun: response });
        return response.data;
    } catch (error) {
        console.error('Error fetching account details:', error.response.data);
        throw error;
    }
};

export const addToWatchlist = async (movieId) => {
    try {
        const response = await axios(`https://api.themoviedb.org/3/account/${account_id}/watchlist`, {
            ...options,
            method: 'POST',
            data: {
                media_type: 'movie',
                media_id: movieId,
                watchlist: true
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getWatchlistMovies = async () => {
    try {
        const movie = await axios(`${baseUrl}/account/${account_id}/watchlist/movies`, options)
        console.log({ watchlist: movie });
        return movie.data.results
    } catch (error) {
        console.log(error);
    }
}

export const addToFavorite = async (movieId) => {
    try {
        const response = await axios(`https://api.themoviedb.org/3/account/${account_id}/favorite`, {
            ...options,
            method: 'POST',
            data: {
                media_type: 'movie',
                media_id: movieId,
                favorite: true
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getFavoriteMovies = async () => {
    try {
        const movie = await axios(`${baseUrl}/account/${account_id}/favorite/movies`, options)
        console.log({ favMovie: movie });
        return movie.data.results
    } catch (error) {
        console.log(error);
    }
}

export const removeFromWatchlist = async (movieId) => {
    try {
      const response = await axios(`https://api.themoviedb.org/3/account/${account_id}/watchlist`, {
        ...options,
        method: 'POST',
        data: {
          media_type: 'movie',
          media_id: movieId,
          watchlist: false
        },
      });
      console.log('Removed from Watchlist!');
      return response.data;
    } catch (error) {
      console.error('Error removing from Watchlist:', error);
      throw error;
    }
  }
export const removeFromFavorite = async (movieId) => {
    try {
      const response = await axios(`https://api.themoviedb.org/3/account/${account_id}/favorite`, {
        ...options,
        method: 'POST',
        data: {
          media_type: 'movie',
          media_id: movieId,
          favorite: false
        },
      });
      console.log('Removed from favorite!');
      return response.data;
    } catch (error) {
      console.error('Error removing from favorite:', error);
      throw error;
    }
  }