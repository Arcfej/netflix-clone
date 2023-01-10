import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Video from "../assets/video.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import axios from "axios";
import { removeFromLikedMovies } from "../store";
import { useDispatch } from "react-redux";

const Card = ({ movieData, isLiked }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [email, setEmail] = useState(undefined);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) setEmail(currentUser.email);
            else navigate("/login");
        });
    }, [navigate]);

    const addToList = async () => {
        try {
            await axios.post("http://localhost:5000/api/user/add", { email, data: movieData });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src={`https://image.tmdb.org/t//p/w500${movieData.image}`} alt="movie"/>
            {
                isHovered && (
                    <div className="hover">
                        <div className="image-video-container">
                            <img
                                src={`https://image.tmdb.org/t//p/w500${movieData.image}`}
                                alt="movie"
                                onClick={() => navigate("/player")}
                            />
                            <video src={Video} autoPlay loop muted onClick={() => navigate("/player")}/>
                        </div>
                        <div className="info-container flex column">
                            <h3 className="name" onClick={() => navigate("/player")}>{movieData.name}</h3>
                            <div className="icons flex j-between">
                                <div className="controls flex">
                                    <IoPlayCircleSharp title="Play" onClick={() => navigate("/player")}/>
                                    <RiThumbUpFill title="Like"/>
                                    <RiThumbDownFill title="Dislike"/>
                                    {
                                        isLiked
                                            ? <BsCheck
                                                title="Remove From List"
                                                onClick={() => {
                                                    dispatch(removeFromLikedMovies({ movieId: movieData.id, email }));
                                                }}/>
                                            : <AiOutlinePlus title="Add to My List" onClick={addToList}/>
                                    }
                                </div>
                                <div className="info">
                                    <BiChevronDown title="More Info"/>
                                </div>
                            </div>
                            <div className="genres flex">
                                <ul className="flex">
                                    {
                                        movieData.genres.map((genre) => <li key={genre}>{genre}</li>)
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            }
        </Container>
    );
};

Card.propTypes = {
    movieData: PropTypes.object,
    isLiked: PropTypes.bool,
};

Card.defaultProps = {
    isLiked: false,
};

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: .2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 90;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: .3rem;
    box-shadow: rgba(0, 0, 0, .75) 0 3px 10px;
    background-color: #181818;
    transition: .3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: .3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: .3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: .5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: .3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: .7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;

export default React.memo(Card);