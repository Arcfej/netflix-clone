import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api_key, TMDB_BASE_URL } from "../utils/constants";
import axios from "axios";

const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async() => {
    const {
        data: { genres }
    } = await axios.get(
        `${TMDB_BASE_URL}/genre/movie/list?api_key=${api_key}`,
    );
    return genres;
});

function createArrayFromRawData(array, moviesArray, genres) {
    array.forEach((movie) => {
        const movieGenres = [];
        movie.genre_ids.forEach((genre) => {
            const name = genres.find(({ id }) => id === genre);
            if (name) movieGenres.push(name.name);
        });
        if (movie.backdrop_path) {
            moviesArray.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                genres: movieGenres.slice(0, 3),
            });
        }
    });
}

const getRawData = async (api, genres,paging) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
        const {
            data: { results }
        } = await axios.get(
            `${api}${paging ? `&page=${i}` : ""}`
        );
        createArrayFromRawData(results, moviesArray, genres);
    }
    return moviesArray;
};

export const fetchMovies = createAsyncThunk("netflix/trending", async ({type}, thunkAPI) => {
    const {netflix: { genres }} = thunkAPI.getState();
    return getRawData(
        `${TMDB_BASE_URL}/trending/${type}/week?api_key=${api_key}`,
        genres,
        true
    );
});
// return getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${api_key}&with_genres=${genre}`)

const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled,(state,action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        });
        builder.addCase(fetchMovies.fulfilled,(state,action) => {
            state.movies = action.payload;
        });
    },
});

export const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer,
    },
});