import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import styled from "styled-components";
import Navbar from "../components/navbar";
import Slider from "../components/slider";
import NotAvailable from "../components/notAvailable";
import SelectGenre from "../components/selectGenre";

const Movies = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    const genresLoaded = useSelector((state) => state.myflix.genresLoaded);
    const movies = useSelector((state) => state.myflix.movies);
    const genres = useSelector(state => state.myflix.genres);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    useEffect(() => {
        if (genresLoaded) dispatch(fetchMovies({ type: "movie" }));
    }, [dispatch, genresLoaded]);

    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true);
        return () => window.onscroll = null;
    };

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (!currentUser) navigate("/");
        });
    }, [navigate]);

    return (
        <Container>
            <div className="navbar">
                <Navbar isScrolled={isScrolled} />
            </div>
            <div className="data">
                <SelectGenre genres={genres} type="movie" />
                {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
            </div>
        </Container>
    );
};

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;

export default Movies;