import React, { useEffect, useState } from "react"
import Navbar from "../components/navbar";
import { FaPlay, } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import BackgroundImage from "../components/background-image";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/slider";

const Netflix = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
    const movies = useSelector((state) => state.netflix.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    useEffect(() => {
        if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
    });

    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true);
        return () => window.onscroll = null;
    };

    return (
        <Container>
            <Navbar isScrolled={isScrolled}/>
            <div className="hero">
                <BackgroundImage image={backgroundImage} altText="background" brightness="60%" />
                <div className="container">
                    <div className="logo">
                        <img src={MovieLogo} alt="Movie Logo" />
                    </div>
                    <div className="buttons flex">
                        <button className="flex j-center a-center" onClick={() => navigate("/player")}>
                            <FaPlay /> Play
                        </button>
                        <button className="flex j-center a-center">
                            <AiOutlineInfoCircle /> More Info
                        </button>
                    </div>
                </div>
            </div>
            <Slider movies={movies} />
        </Container>
    );
};

const Container = styled.div`
  background-color: black;

  .hero {
    position: relative;

    .container {
      position: absolute;
      bottom: 5rem;

      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }

      .buttons {
        margin: 5rem;
        gap: 2rem;

        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: .2rem;
          padding: .5rem 2.4rem .5rem 2rem;
          border: none;
          cursor: pointer;
          transition: .3s ease-in-out;
          &:hover {
            opacity: .8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;

export default Netflix;